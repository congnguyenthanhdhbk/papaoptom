import {Args, Mutation, Resolver} from '@nestjs/graphql';
import * as _ from "lodash";
import * as generator from "generate-serial-number";
import {OrderRes} from "../dto/res/OrderRes";
import {OrderService} from "../services/OrderService";
import {HttpStatus} from "@nestjs/common";

@Resolver()
export class OrderResolver {
    constructor(
        private readonly orderService: OrderService,
    ) {}

    @Mutation(() => OrderRes)
    async addOrder(
        @Args({ name: "phoneNumber", type: () => String}) phoneNumber?: string,
        @Args({ name: "product", type: () => String}) product?: string,
        // @Args({ name: 'customer', type: () => CustomerReq, nullable: true}) customer?: CustomerReq,
        // @Args({ name: 'payment', type: () => PaymentReq, nullable: true}) payment?: PaymentReq,
        // @Args({ name: 'shipping', type: () => [ShippingReq], nullable: true}) shipping?: ShippingReq[],
        // @Args({ name: 'product', type: () => [ProductReq], nullable: true}) product?: ProductReq[]
    ) {
        const customer = {
            fullName: null,
            email: null,
            phone: phoneNumber,
            address: null,
        };

        const products = JSON.parse(product);
        const order = {
            orderNumber: generator.generate(10),
            customer,
            // payment,
            // shipping,
            product: products,
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
