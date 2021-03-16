import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Product} from "../interfaces/product.interface";
import {RefBookCharacteristics} from "../interfaces/ref-book-characteristics.interface";
import {ForsageService} from "../../forsage/services/forsage.service";
import * as moment from "moment";
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

    @Cron("* 10 * * * *")
    async getProducts(): Promise<Product> {
        this.logger.debug("*******Start get product*********")
        const now = moment();
        const startDate = now
            .subtract(3, "days")
            .startOf("day")
            .unix();
        const endDate = now.endOf("day").unix();
        const products = await this.forsageService.getProducts(startDate, endDate, 1);
        const { status, data } = products;
        if (_.isEqual(status, 200)) {
            return await this.productModel.insertMany(data?.products);
        }
        return null;
    }
}
