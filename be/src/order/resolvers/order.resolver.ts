import {Args, Mutation, Resolver} from '@nestjs/graphql';
import * as _ from "lodash";
import {OrderRes} from "../dto/res/OrderRes";
import {CustomerReq} from "../dto/req/CustomerReq";
import {PaymentReq} from "../dto/req/PaymentReq";
import {ShippingReq} from "../dto/req/ShippingReq";
import {ProductReq} from "../dto/req/ProductReq";
import {OrderService} from "../services/OrderService";
import {HttpStatus} from "@nestjs/common";

@Resolver()
export class OrderResolver {
    constructor(
        private readonly orderService: OrderService,
    ) {}

    @Mutation(() => OrderRes)
    async addOrder(
        @Args({ name: 'customer', type: () => CustomerReq, nullable: true}) customer?: CustomerReq,
        @Args({ name: 'payment', type: () => PaymentReq, nullable: true}) payment?: PaymentReq,
        @Args({ name: 'shipping', type: () => [ShippingReq], nullable: true}) shipping?: ShippingReq[],
        @Args({ name: 'product', type: () => [ProductReq], nullable: true}) product?: ProductReq[]
    ) {
        const order = {
            customer,
            payment,
            shipping,
            product,
        }
        const savedOrder = await this.orderService.createOrder(order);
        if (_.isEmpty(savedOrder)) {
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "вставленный заказ не удался",
                success: false
            }
        }

        return {
            code: HttpStatus.CREATED,
            message: "Заказ создан",
            success: true,
        }
    }
}
