import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ProductFilterReq } from '../../dto/req/ProductFilterReq';
import { ProductRes } from '../../dto/res/ProductRes';
import { HttpStatus } from '@nestjs/common';
import { ProductService } from '../../services/product.service';
import * as _ from 'lodash';
import { CurrencyRate } from '../../../shared/CurrencyRate';
import { ProductDetailRes } from '../../dto/res/ProductDetailRes';
import {Product} from "../../interfaces/product.interface";

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly currency: CurrencyRate,
  ) {}

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

    const characteristics = this.convertPrice(product);

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
        slug: product?.sku
      },
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
    const data = product?.docs.map((product) => {
      const characteristics = this.convertPrice(product);
      return {
        id: product?.id ?? 0,
        vcode: product?.vcode ?? null,
        name: product?.name ?? null,
        quantity: product?.quantity ?? 0,
        category: product?.category ?? {},
        supplier: product?.supplier ?? {},
        brand: product?.brand ?? {},
        createdAt: product?.createdAt ?? new Date(),
        updatedAt: product?.updatedAt ?? new Date(),
        slug: product?.sku ?? null,
        characteristics,
      };
    });
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

  convertPrice(product: any): any {
    const characteristic = product?.characteristics ?? {};
    const type =
        product?.characteristics?.purchaseCurrency ??
        this.currency.CURRENCY_RHA;

    const purchasePrice = this.currency.convertCurrency({
      type,
      value: product?.characteristics?.purchasePrice ?? 0,
    });
    const sellingPrice = this.currency.convertCurrency({
      type,
      value: product?.characteristics?.sellingPrice ?? 0,
    });
    const oldPurchasePrice = this.currency.convertCurrency({
      type,
      value: product?.characteristics?.oldPurchasePrice ?? 0,
    });
    const oldSellingPrice = this.currency.convertCurrency({
      type,
      value: product?.characteristics?.oldSellingPrice ?? 0,
    });
    const steamInBox = product?.characteristics?.steamInBox ?? 1;

    const totalPurchasePrice = Number(purchasePrice) * Number(steamInBox);
    const totalSellingPrice = Number(sellingPrice) * Number(steamInBox);
    const totalOldPurchasePrice =
        Number(oldPurchasePrice) * Number(steamInBox);
    const totalOldSellingPrice = Number(oldSellingPrice) * Number(steamInBox);
    // TODO: Add percent
    const subtractSellingPrice = _.subtract(
        totalSellingPrice,
        totalOldSellingPrice,
    );
    const discountInPercent =
        _.round(_.divide(subtractSellingPrice, totalSellingPrice) * 100, 0).toFixed(0);

    return {
      ...characteristic,
      purchasePrice,
      sellingPrice,
      oldPurchasePrice,
      oldSellingPrice,
      totalOldPurchasePrice,
      totalOldSellingPrice,
      totalPurchasePrice,
      totalSellingPrice,
      discountInPercent,
    };
  }
}
