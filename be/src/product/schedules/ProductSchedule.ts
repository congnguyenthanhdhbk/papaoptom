import {HttpStatus, Injectable, Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {NotFoundProduct} from '../interfaces/NotFoundProduct';
import {Product} from '../interfaces/product.interface';
import {RefBookCharacteristics} from '../interfaces/ref-book-characteristics.interface';
import {Sku} from '../interfaces/Sku';
import {CronJob} from '../interfaces/CronJob';
import {ForsageService} from '../../forsage/services/forsage.service';
import * as momentTz from 'moment-timezone';
import axios from 'axios';
import * as _ from 'lodash';
import {ProductConstant} from '../constants/ProductConstant';
import {Cron} from '@nestjs/schedule';
import {Categories} from "../interfaces/Categories";

@Injectable()
export class ProductSchedule {
  private readonly logger = new Logger(ProductSchedule.name);
  constructor(
    @InjectModel('NotFoundProduct')
    private readonly notFoundModel: Model<NotFoundProduct>,
    @InjectModel('ForsageProduct')
    private readonly productModel: Model<Product>,
    @InjectModel('Product')
    private readonly product: Model<Product>,
    @InjectModel('RefbookCharacteristics')
    private readonly refbookCharacteristics: Model<RefBookCharacteristics>,
    @InjectModel('sku') private readonly sku: Model<Sku>,
    @InjectModel('CronJob') private readonly cronJob: Model<CronJob>,
    @InjectModel("Categories") private readonly categoriesModel: Model<Categories>,
    private readonly forsageService: ForsageService,
  ) {}

  @Cron("*/10 * * * * *")
  async fetchCharacteristics(): Promise<void> {
      const checkExists = await this.categoriesModel.find({});
      if (_.isEmpty(checkExists)) {
          const forsageCharacteristics = await axios
              .get(`${process.env.FORSAGE_URI}/get_refbook_characteristics?token=${process.env.FORSAGE_TOKEN}`);
          if (_.isEqual(HttpStatus.OK, forsageCharacteristics?.status)) {
              const success = forsageCharacteristics?.data?.success ?? false;
              if (success) {
                  this.logger.debug("Start for sync categories");
                  const characteristics = forsageCharacteristics?.data?.characteristics ?? [];
                  const normalizeCharacteristics = characteristics.map((ch) => ({
                      title: ch?.name ?? null,
                      slug: ch?.name ?? null,
                      icon: null,
                      id: ch?.id ?? null,
                      children: ch?.values?.map((v) => ({
                          id: v?.id ?? null,
                          title: v?.value ?? null,
                          slug: v?.value ?? null,
                      })) ?? []
                  }));
                  await this.categoriesModel.insertMany(normalizeCharacteristics);
                  this.logger.debug("Finished for sync categories");
              }
          }
      }
  }
  // @Cron("*/10 * * * * *")
  /*async normalizeProducts(): Promise<void> {
        this.logger.debug("++++++++++++++++++start build+++++++++++++++++++");
        const forsageProducts = await this.productModel.find({});
        this.logger.debug("Finished load forsage data");
        if (forsageProducts !== null) {
            // @ts-ignore
            const products = forsageProducts.map(product => {
                let obj = {
                    sku: product?.id ?? null,
                    vcode: product?.vcode ?? null,
                    name: product?.name ?? null,
                    quantity: product?.quantity ?? null,
                    category: product?.category ?? {},
                    supplier: product?.supplier ?? {},
                    brand: product?.brand ?? {},
                };
                const characteristics = _.values(product?.characteristics ?? []);
                let mappedObj = {};
                const mappedCharacteristics = characteristics.map((characteristic) => {
                    const { name, value } = characteristic;
                    if (_.isEqual(name, ProductConstant.description)) {
                        mappedObj = {...mappedObj, description: value};
                    }
                    if (_.isEqual(name, ProductConstant.photo1)) {
                        mappedObj = {...mappedObj, photo1: value};
                    }

                    if (_.isEqual(name, ProductConstant.productMaterial)) {
                        mappedObj = {...mappedObj, productMaterial: value};
                    }

                    if (_.isEqual(name, ProductConstant.sizeChart)) {
                        mappedObj = {...mappedObj, sizeChart: value};
                    }

                    if (_.isEqual(name, ProductConstant.repeatedDimensions)) {
                        mappedObj = {...mappedObj, repeatedDimensions: value};
                    }

                    if (_.isEqual(name, ProductConstant.steamInBox)) {
                        mappedObj = {...mappedObj, steamInBox: value};
                    }

                    if (_.isEqual(name, ProductConstant.liningMaterial)) {
                        mappedObj = {...mappedObj, liningMaterial: value};
                    }

                    if (_.isEqual(name, ProductConstant.outsoleMaterial)) {
                        mappedObj = {...mappedObj, outsoleMaterial: value};
                    }

                    if (_.isEqual(name, ProductConstant.country)) {
                        mappedObj = {...mappedObj, country: value};
                    }

                    if (_.isEqual(name, ProductConstant.heelHeight)) {
                        mappedObj = {...mappedObj, heelHeight: value};
                    }

                    if (_.isEqual(name, ProductConstant.platformHeight)) {
                        mappedObj = {...mappedObj, platformHeight: value};
                    }

                    if (_.isEqual(name, ProductConstant.picturedSize)) {
                        mappedObj = {...mappedObj, picturedSize: value};
                    }

                    if (_.isEqual(name, ProductConstant.purchasePrice)) {
                        mappedObj = {...mappedObj, purchasePrice: value};
                    }

                    if (_.isEqual(name, ProductConstant.sellingPrice)) {
                        mappedObj = {...mappedObj, sellingPrice: value};
                    }

                    if (_.isEqual(name, ProductConstant.season)) {
                        mappedObj = {...mappedObj, season: value};
                    }

                    if (_.isEqual(name, ProductConstant.shootingDate)) {
                        mappedObj = {...mappedObj, shootingDate: value};
                    }

                    if (_.isEqual(name, ProductConstant.purchaseCurrency)) {
                        mappedObj = {...mappedObj, purchaseCurrency: value};
                    }

                    if (_.isEqual(name, ProductConstant.saleCurrency)) {
                        mappedObj = {...mappedObj, saleCurrency: value};
                    }

                    if (_.isEqual(name, ProductConstant.floor)) {
                        mappedObj = {...mappedObj, floor: value};
                    }

                    if (_.isEqual(name, ProductConstant.type)) {
                        mappedObj = {...mappedObj, type: value};
                    }

                    if (_.isEqual(name, ProductConstant.oldPurchasePrice)) {
                        mappedObj = {...mappedObj, oldPurchasePrice: value};
                    }

                    if (_.isEqual(name, ProductConstant.oldSellingPrice)) {
                        mappedObj = {...mappedObj, oldSellingPrice: value};
                    }

                    if (_.isEqual(name, ProductConstant.insoleMaterial)) {
                        mappedObj = {...mappedObj, insoleMaterial: value};
                    }

                    if (_.isEqual(name, ProductConstant.videoReview)) {
                        mappedObj = {...mappedObj, videoReview: value};
                    }
                    return mappedObj;
                });
                // @ts-ignore
                obj = {...obj, characteristics: mappedCharacteristics[mappedCharacteristics.length - 1]};
                return obj;
            });
            this.logger.debug("proceed success");

            // @ts-ignore
            await this.product.insertMany(products);
            this.logger.debug("Finished");
        }

    }*/

  // @Cron("0 */60 * * * *")
  async getProducts(): Promise<void> {
    this.logger.debug('*******Start get product*********');
    const now = momentTz('2020-01-04').tz('Europe/Kiev');
    const startDate = now.startOf('day').unix();
    const endDate = now.add(1, 'days').endOf('day').unix();
    this.logger.debug(`Print start date ${startDate} and ${endDate}`);
    const products = await this.forsageService.getProducts(
      startDate,
      endDate,
      1,
    );
    const { status, data } = products;
    if (_.isEqual(status, 200)) {
      const pds = await Promise.all(
        data?.products
          .map(async (product) => {
            const productExists = await this.productModel.findOne({
              id: product.id,
            });
            if (productExists) {
              return null;
            }
            return product;
          })
          .filter((filter) => !_.isEqual(filter, null)),
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await this.productModel.insertMany(pds);
      this.logger.debug(`import successfully ${pds.length} records`);
    }
  }

  // @Cron("0 */2 * * * *")
  /*async importProducts(): Promise<void> {
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
    }*/

  // @Cron("*/3 * * * * *")
  async loadAllProductById(): Promise<void> {
    try {
      const ids = [];
      const importedProducts = await Promise.all(
        ids.map(async (id) => await this.forsageService.getProductById(id)),
      );
      await this.productModel.insertMany(importedProducts);
    } catch (e) {
      return e?.message;
    }
  }

  @Cron('*/3 * * * * *')
  async loadAllProduct(): Promise<void> {
    const cronJob = await this.cronJob.findOne({ domain: 'PRODUCT' });
    let skuOption = 0;
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const skus = await this.sku.paginate(
        { status: 'NEW' },
        { page: cronJob.times, limit: 1 },
      );
      const { docs } = skus;
      const sku = docs[0];
      skuOption = sku.sku;
      this.logger.debug(`SKU:: ${sku.sku}`);
      const prod = await axios.get(sku.uri);
      this.logger.debug(`RESULT::${prod.data}`);
      const { status, data } = prod;
      if (_.isEqual(status, 200)) {
        const { product, success } = data;
        if (success) {
          let obj = {
            sku: product?.id ?? null,
            vcode: product?.vcode ?? null,
            name: product?.name ?? null,
            quantity: product?.quantity ?? null,
            category: product?.category ?? {},
            supplier: product?.supplier ?? {},
            brand: product?.brand ?? {},
            characteristics: {},
          };
          const characteristics = _.values(product?.characteristics ?? []);
          let mappedObj = {};
          const mappedCharacteristics = characteristics.map(
            (characteristic) => {
              const { name, value } = characteristic;
              if (_.isEqual(name, ProductConstant.description)) {
                mappedObj = { ...mappedObj, description: value };
              }
              if (_.isEqual(name, ProductConstant.photo1)) {
                mappedObj = { ...mappedObj, photo1: value };
              }

              if (_.isEqual(name, ProductConstant.productMaterial)) {
                mappedObj = { ...mappedObj, productMaterial: value };
              }

              if (_.isEqual(name, ProductConstant.sizeChart)) {
                mappedObj = { ...mappedObj, sizeChart: value };
              }

              if (_.isEqual(name, ProductConstant.repeatedDimensions)) {
                mappedObj = { ...mappedObj, repeatedDimensions: value };
              }

              if (_.isEqual(name, ProductConstant.steamInBox)) {
                mappedObj = { ...mappedObj, steamInBox: value };
              }

              if (_.isEqual(name, ProductConstant.liningMaterial)) {
                mappedObj = { ...mappedObj, liningMaterial: value };
              }

              if (_.isEqual(name, ProductConstant.outsoleMaterial)) {
                mappedObj = { ...mappedObj, outsoleMaterial: value };
              }

              if (_.isEqual(name, ProductConstant.country)) {
                mappedObj = { ...mappedObj, country: value };
              }

              if (_.isEqual(name, ProductConstant.heelHeight)) {
                mappedObj = { ...mappedObj, heelHeight: value };
              }

              if (_.isEqual(name, ProductConstant.platformHeight)) {
                mappedObj = { ...mappedObj, platformHeight: value };
              }

              if (_.isEqual(name, ProductConstant.picturedSize)) {
                mappedObj = { ...mappedObj, picturedSize: value };
              }

              if (_.isEqual(name, ProductConstant.purchasePrice)) {
                mappedObj = { ...mappedObj, purchasePrice: value };
              }

              if (_.isEqual(name, ProductConstant.sellingPrice)) {
                mappedObj = { ...mappedObj, sellingPrice: value };
              }

              if (_.isEqual(name, ProductConstant.season)) {
                mappedObj = { ...mappedObj, season: value };
              }

              if (_.isEqual(name, ProductConstant.shootingDate)) {
                mappedObj = { ...mappedObj, shootingDate: value };
              }

              if (_.isEqual(name, ProductConstant.purchaseCurrency)) {
                mappedObj = { ...mappedObj, purchaseCurrency: value };
              }

              if (_.isEqual(name, ProductConstant.saleCurrency)) {
                mappedObj = { ...mappedObj, saleCurrency: value };
              }

              if (_.isEqual(name, ProductConstant.floor)) {
                mappedObj = { ...mappedObj, floor: value };
              }

              if (_.isEqual(name, ProductConstant.type)) {
                mappedObj = { ...mappedObj, type: value };
              }

              if (_.isEqual(name, ProductConstant.oldPurchasePrice)) {
                mappedObj = { ...mappedObj, oldPurchasePrice: value };
              }

              if (_.isEqual(name, ProductConstant.oldSellingPrice)) {
                mappedObj = { ...mappedObj, oldSellingPrice: value };
              }

              if (_.isEqual(name, ProductConstant.insoleMaterial)) {
                mappedObj = { ...mappedObj, insoleMaterial: value };
              }

              if (_.isEqual(name, ProductConstant.videoReview)) {
                mappedObj = { ...mappedObj, videoReview: value };
              }
              return mappedObj;
            },
          );
          obj = {
            ...obj,
            characteristics:
              mappedCharacteristics[mappedCharacteristics.length - 1],
          };

          this.logger.debug(
            `${product?.id} has been finished for normalize data`,
          );
          const savedProduct = new this.product(obj);
          const saved = await savedProduct.save();
          this.logger.debug(`${product?.id} save successfully ${saved}`);
        } else {
          const savedNotFoundProduct = new this.notFoundModel({
            sku: sku.sku,
            requestStatus: status,
          });
          const savedNotFound = await savedNotFoundProduct.save();
        }
      } else {
        const savedNotFoundProduct = new this.notFoundModel({
          sku: sku.sku,
          requestStatus: status,
        });
        const savedNotFound = await savedNotFoundProduct.save();
      }
    } catch (e) {
      const savedNotFoundProduct = new this.notFoundModel({
        sku: skuOption,
        requestStatus: 500,
      });
      const savedNotFound = await savedNotFoundProduct.save();
    } finally {
      cronJob.times += 1;
      cronJob.status = 'FINISHED';
      cronJob.end = new Date();
      await cronJob.save();
    }
  }
}
