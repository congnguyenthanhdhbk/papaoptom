import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Product} from "../interfaces/product.interface";
import {RefBookCharacteristics} from "../interfaces/ref-book-characteristics.interface";
import {ForsageService} from "../../forsage/services/forsage.service";
import * as moment from "moment";
import * as momentTz from "moment-timezone";
import * as _ from "lodash";
import {Cron} from "@nestjs/schedule";

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);

    constructor(
        @InjectModel("Product") private readonly productModel: Model<Product>,
        @InjectModel("RefbookCharacteristics") private readonly refbookCharacteristics: Model<RefBookCharacteristics>,
        private readonly forsageService: ForsageService
    ) {}

    @Cron("*/60 * * * * *")
    async getProducts(): Promise<void> {
        this.logger.debug("*******Start get product*********")
        const now = momentTz().tz("Europe/Kiev");
        const firstDay = momentTz("2020/01/04").tz("Europe/Kiev");
        const startDate = firstDay
            .subtract(2, "days")
            .startOf("day")
            .unix();
        const endDate = now
            .endOf("day")
            .unix();
        const products = await this.forsageService.getProducts(startDate, endDate, 1);
        const { status, data } = products;
        if (_.isEqual(status, 200)) {
            const pds = await Promise.all(data?.products.map(async (product) => {
                const productExists = await this.productModel.findOne({ id: product.id});
                if (productExists) {
                    return null;
                }
                return product;
            }).filter((filter) => !_.isEqual(filter, null)));
            // @ts-ignore
            await this.productModel.insertMany(pds);
            this.logger.debug(`import successfully ${pds.length} records`);
        }
    }
}
