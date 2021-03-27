import {Injectable, Logger} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {NotFoundProduct} from "../interfaces/NotFoundProduct";
import {Product} from "../interfaces/product.interface";
import {RefBookCharacteristics} from "../interfaces/ref-book-characteristics.interface";
import {Sku} from "../interfaces/Sku";
import {CronJob} from "../interfaces/CronJob";
import {ForsageService} from "../../forsage/services/forsage.service";
import * as momentTz from "moment-timezone";
import fs from "fs";
import axios from "axios";
import * as _ from "lodash";

@Injectable()
export class ProductSchedule {
    private readonly logger = new Logger(ProductSchedule.name);
    constructor(
        @InjectModel('NotFoundProduct')
        private readonly notFoundModel: Model<NotFoundProduct>,
        @InjectModel('ForsageProduct')
        private readonly productModel: Model<Product>,
        @InjectModel('RefbookCharacteristics')
        private readonly refbookCharacteristics: Model<RefBookCharacteristics>,
        @InjectModel('sku') private readonly sku: Model<Sku>,
        @InjectModel('CronJob') private readonly cronJob: Model<CronJob>,
        private readonly forsageService: ForsageService,
    ) {}

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
            // @ts-ignore
            await this.productModel.insertMany(pds);
            this.logger.debug(`import successfully ${pds.length} records`);
        }
    }

    // @Cron("0 */2 * * * *")
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

    // @Cron('*/3 * * * * *')
    async loadAllProduct(): Promise<void> {
        const cronJob = await this.cronJob.findOne({ domain: 'PRODUCT' });
        let skuOption = 0;
        try {
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
                    const savedProduct = new this.productModel(product);
                    const saved = await savedProduct.save();
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