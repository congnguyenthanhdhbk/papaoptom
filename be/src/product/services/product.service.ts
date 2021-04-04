import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../interfaces/product.interface';
import * as fs from 'fs';
import { Sku } from '../interfaces/Sku';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectModel('ForsageProduct')
    private readonly productModel: Model<Product>,
    @InjectModel('Product')
    private readonly product: Model<Product>,
    @InjectModel('sku')
    private readonly sku: Model<Sku>,
  ) {}

  async importProducts(): Promise<void> {
    const fileName = 'export_product.json';
    fs.readFile(fileName, async (error, data) => {
      this.logger.debug('Read file: starting...');
      if (error) {
        this.logger.debug('Read: Not successful!');
        this.logger.error(error);
      } else {
        try {
          // @ts-ignore
          const ids = JSON.parse(data);
          // const product = await this.forsageService.getProductById(452838);

          const productIds = await Promise.all(
            ids.map((id) => ({
              sku: id.id,
              uri: `${process.env.FORSAGE_URI}/get_product/${id.id}?token=${process.env.FORSAGE_TOKEN}`,
            })),
          );
          // @ts-ignore
          await this.sku.insertMany(productIds);

          // const importedProducts = await Promise.all(ids.map(async (id) => {
          //     this.logger.debug(`Product Id: ${id}`);
          //     const product = await this.forsageService.getProductById(id.id);
          //     this.logger.debug(`Get Product Id ${id} and result ${product}`);
          //     return product;
          // }));
          // // @ts-ignore
          // await this.productModel.insertMany(importedProducts);
          this.logger.debug('Successful {}', ids.length);
        } catch (e) {
          this.logger.error(e);
        }
      }
    });
  }

  async findProductById(id: string): Promise<any> {
    return this.product.findOne({ sku: id });
  }

  async findAllProduct(pageNumber: number, pageSize: number): Promise<Product> {
    const page = pageNumber ? pageNumber : 1;
    const limit = pageSize ? pageSize : 999999;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.product.paginate({}, { page, limit });
  }

  async searchShoes({ searchTerm, pageSize, pageNumber }) {
    const page = pageNumber ? pageNumber : 1;
    const limit = pageSize ? pageSize : 999999;

    const criteria = {
      $or: [],
    };

    criteria.$or.push({ name: new RegExp(`^${searchTerm}$`, 'i')  });
    criteria.$or.push({ vcode: new RegExp(`^${searchTerm}$`, 'i') });
    criteria.$or.push({ id: new RegExp(`^${searchTerm}$`, 'i') });
    criteria.$or.push({ "brand.name": new RegExp(`^${searchTerm}$`, 'i') });
    criteria.$or.push({ "category.name": new RegExp(`^${searchTerm}$`, 'i') });
    criteria.$or.push({ "supplier.company": new RegExp(`^${searchTerm}$`, 'i') });

    // @ts-ignore
    return this.product.paginate(criteria, { page, limit });
  }
  async filterProduct({
    id,
    name,
    pageSize,
    pageNumber,
    category,
    supplier,
    brand,
  }) {
    const page = pageNumber ? pageNumber : 1;
    const limit = pageSize ? pageSize : 999999;

    if (!id && !name && !category && !supplier && !brand) {
      // @ts-ignore
      return this.product.paginate({}, { page, limit });
    }

    const criteria = {
      $and: [],
    };

    if (id) {
      criteria.$and.push({ sku: id });
    }

    if (name) {
      criteria.$and.push({ name: new RegExp(`^${name}$`, 'i') });
    }

    if (category) {
      criteria.$and.push({ 'category.name': new RegExp(`^${category}$`, 'i') });
    }

    if (supplier) {
      criteria.$and.push({
        'supplier.company': new RegExp(`^${supplier}$`, 'i'),
      });
    }

    if (brand) {
      criteria.$and.push({ 'brand.name': new RegExp(`^${brand}$`, 'i') });
    }

    // @ts-ignore
    return this.product.paginate(criteria, { page, limit });
  }
}
