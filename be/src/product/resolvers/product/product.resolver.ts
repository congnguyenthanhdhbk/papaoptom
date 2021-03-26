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
    const { id, supplier, category, brand, name } = filter;
    if (!id) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: 'Id требуется',
      };
    }

    const product = await this.productService.findProductById(id);
    if (product !== null) {
      return {
        code: HttpStatus.OK,
        message: '1 результат найден',
        data: this.productService.findProductById(id),
      };
    }
    return {
      code: HttpStatus.NOT_FOUND,
      message: 'результатов не найдено',
    };
  }
}
