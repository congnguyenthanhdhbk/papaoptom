import {Args, Int, Query, Resolver} from '@nestjs/graphql';
import {ProductFilterReq} from '../../dto/req/ProductFilterReq';
import {ProductRes} from '../../dto/res/ProductRes';
import {HttpStatus} from '@nestjs/common';
import {ProductService} from '../../services/product.service';
import * as _ from 'lodash';
import {ProductDetailRes} from '../../dto/res/ProductDetailRes';
import {ProductHelper} from '../../helpers/ProductHelper';
import {CategoriesRes} from "../../dto/res/CategoriesRes";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Categories} from "../../interfaces/Categories";

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly productHelper: ProductHelper,
    @InjectModel("Categories") private readonly categoriesModel: Model<Categories>
  ) {}

  @Query(() => [CategoriesRes])
  async categories(@Args({ name: "type", type: () => String, nullable: true}) type?: string) {
    const categories = await  this.categoriesModel.find({});
    return categories;
  }
  @Query(() => ProductDetailRes)
  async getProduct(@Args({ name: 'slug', type: () => String }) slug: string) {
    if (!slug) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: 'требуется пуля',
      };
    }
    const product = await this.productService.findProductById(slug);

    if (_.isEmpty(product)) {
      return {
        code: HttpStatus.NOT_FOUND,
        message: 'никаких записей не найдено',
      };
    }

    const characteristics = this.productHelper.convertPrice(product);

    return {
      code: HttpStatus.OK,
      message: '1 результат найден',
      data: {
        ...product,
        id: product?.id ?? 0,
        vcode: product?.vcode ?? null,
        name: product?.name ?? null,
        quantity: product?.quantity ?? 0,
        category: product?.category ?? {},
        supplier: product?.supplier ?? {},
        brand: product?.brand ?? {},
        createdAt: product?.createdAt ?? new Date(),
        updatedAt: product?.updatedAt ?? new Date(),
        characteristics,
        slug: product?.sku,
      },
    };
  }

  @Query(() => ProductRes)
  async searchShoes(
      @Args({ name: 'searchTerm', type: () => String, nullable: true}) searchTerm?: string,
      @Args({ name: 'pageSize', type: () => Int, nullable: true}) pageSize?: number,
      @Args({ name: 'pageNumber', type: () => Int, nullable: true}) pageNumber?: number,
  ) {
    const product = await this.productService.searchShoes(
        { searchTerm, pageSize, pageNumber });
    const data = product?.docs.map((product) =>
        this.productHelper.presentProduct(product),
    );
    if (product !== null) {
      return {
        code: HttpStatus.OK,
        message: `${product?.totalDocs ?? 0} результат найден`,
        data,
        totalDocs: product?.totalDocs ?? 0,
        hasPrevPage: product?.hasPrevPage ?? false,
        hasNextPage: product?.hasNextPage ?? false,
        totalPages: product?.totalPages ?? 0,
        prevPage: product?.prevPage ?? 0,
        nextPage: product?.nextPage ?? 0,
        pageNumber: product?.page ?? 0,
        pageSize: product?.limit ?? 0,
      };
    }
    return {
      code: HttpStatus.NOT_FOUND,
      message: 'результатов не найдено',
    };
  }

  @Query(() => ProductRes)
  async filterProduct(
    @Args({ name: 'filter', type: () => ProductFilterReq })
    filter?: ProductFilterReq,
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const product = await this.productService.filterProduct(filter);
    const data = product?.docs.map((product) =>
      this.productHelper.presentProduct(product),
    );
    if (product !== null) {
      return {
        code: HttpStatus.OK,
        message: `${product?.totalDocs ?? 0} результат найден`,
        data,
        totalDocs: product?.totalDocs ?? 0,
        hasPrevPage: product?.hasPrevPage ?? false,
        hasNextPage: product?.hasNextPage ?? false,
        totalPages: product?.totalPages ?? 0,
        prevPage: product?.prevPage ?? 0,
        nextPage: product?.nextPage ?? 0,
        pageNumber: product?.page ?? 0,
        pageSize: product?.limit ?? 0,
      };
    }
    return {
      code: HttpStatus.NOT_FOUND,
      message: 'результатов не найдено',
    };
  }
}
