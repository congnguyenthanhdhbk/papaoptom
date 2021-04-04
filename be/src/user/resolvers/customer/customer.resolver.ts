import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import * as _ from "lodash";
import * as uniqid from "uniqid";
import {CustomerRes} from "../../dto/res/CustomerRes";
import {CustomersReq} from "../../dto/req/CustomersReq";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Customer} from "../../interfaces/Customer";
import {HttpStatus} from "@nestjs/common";
import {CustomerDtoRes} from "../../dto/res/CustomerDtoRes";

@Resolver()
export class CustomerResolver {
    constructor(
        @InjectModel("customer") private readonly customerModel: Model<Customer>
    ) {
    }

    @Query(() => CustomerDtoRes)
    async me(@Args({ name: "id", type: () => String, nullable: true}) id?: string) {
        // @ts-ignore
        const customer = await this.customerModel.findOne({ id });
        if (_.isEmpty(customer)) {
            return null;
        }
        const addresses = customer?.address ?? [];
        const contacts = customer?.primaryContact ?? [];
        const cards = customer?.card ?? [];

        const address = addresses.map(addr => ({
            id: addr?.id ?? null,
            type: addr?.addressType ?? "",
            name: addr?.name ?? "",
            info: addr?.info ?? ""
        }))
        const contact = contacts.map((c) => ({
            id: c?.id ?? "",
            type: c?.contactType ?? "",
            number: c?.number ?? 0
        }));
        const card = cards.map(c => ({
            id: c?.id ?? "",
            type: c?.usedType ?? "",
            cardType: c?.cardType ?? "",
            name: c?.name ?? "",
            lastFourDigit: c?.lastFourDigit ?? 0
        }))

        return {
            id: customer?.id ?? null,
            name: customer?.name ?? null,
            email: customer?.email ?? null,
            address,
            contact: [],
            card };
    }

    @Mutation(() => CustomerDtoRes)
    async updateContact(@Args(
        { name: "contactInput", type: () => String, nullable: true}) contactInput?: string) {
        const contact = JSON.parse(contactInput);
        const customer = await this.customerModel.findOne({ id: 1});
        const id = uniqid();
        const primaryContact = [];
        contact.id = contact?.id ?? id;
        contact.contactType = contact?.type ?? "primary";
        (customer?.contact ?? []).push(contact);
        primaryContact.push(contact);
        customer.primaryContact = [...primaryContact];
        const savedCustomer = await customer.save();
        const savedContact = customer?.primaryContact?.map(c => ({
            id: c?.id ?? null,
            type: c?.contactType ?? null,
            number: c?.number ?? 0
        }));

        return {
            id: savedCustomer?.id ?? 1,
            name: savedCustomer?.name ?? null,
            contact: savedContact ?? []
        };

    }

    @Mutation(() => CustomerDtoRes)
    async deleteContact(@Args({ name: 'contactId', type: () => String, nullable: true}) contactId: string) {
        const customer = await this.customerModel.findOne({ id: 1 });
        customer.primaryContact = [];
        const savedCustomer = await customer.save();
        return {
            id: savedCustomer?.id ?? 1,
            name: savedCustomer?.id ?? null,
            contact: savedCustomer?.primaryContact ?? []
        }
    }
    @Mutation(() => CustomerRes)
    async addCustomers(
        @Args({ name: "customers", type: () => [CustomersReq], nullable: true}) customers?: CustomersReq[]
    ) {
        if (_.isEmpty(customers)) {
            return {
                code: HttpStatus.BAD_REQUEST,
                message: "клиенты требуются",
                success: false
            }
        }
        // @ts-ignore
        const savedCustomers = await this.customerModel.insertMany(customers);
        if (_.isEmpty(savedCustomers)) {
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "не удалось вставить клиентов",
                success: false
            }
        }

        return {
            code: HttpStatus.CREATED,
            message: "создание клиентов успешно",
            success: true
        }
    }
}
