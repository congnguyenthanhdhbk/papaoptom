import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductFilterReq } from '../../dto/req/ProductFilterReq';
import { ProductRes } from '../../dto/res/ProductRes';
import { HttpStatus } from '@nestjs/common';
import { ProductService } from '../../services/product.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => ProductRes)
  async filterProduct(
    @Args({ name: 'filter', type: () => ProductFilterReq })
    filter?: ProductFilterReq,
  ) {
    // @ts-ignore
    const product = await this.productService.filterProduct(filter);
    if (product !== null) {
      return {
        code: HttpStatus.OK,
        message: `${product?.totalDocs ?? 0} результат найден`,
        data: product?.docs ?? {},
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
