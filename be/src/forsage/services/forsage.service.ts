import { Injectable } from '@nestjs/common';
import {AxiosInstance} from "../axios.config";
import axios from "axios";

@Injectable()
export class ForsageService {
    private readonly axiosInstance;
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.FORSAGE_URI,
            headers: { "Content-Type": "application/json"},
            // timeout: 3600
        })
    }
    async getProductById(productId: number): Promise<any> {
        return await AxiosInstance.get(`/get_product/${productId}?token=${process.env.FORSAGE_TOKEN}`);
    }

    async getProducts(startDate: number, endDate: number, quantity: number): Promise<any> {
        return await this.axiosInstance.get(`/get_products?start_date=${startDate}&token=${process.env.FORSAGE_TOKEN}&quantity=${quantity}`);
    }

    async getChanges({ startDate, endDate, quantity}): Promise<any> {
        return await AxiosInstance.get(`/get_changes?start_date=${startDate}&end_date=${endDate}&token=${process.env.FORSAGE_TOKEN}&products=full&quantity=${quantity}`);
    }

    async getRefbookCharacteristics(): Promise<any> {
        return await AxiosInstance.get(`/get_refbook_characteristics?token=${process.env.FORSAGE_TOKEN}`);
    }

    async getSuppliers(): Promise<any> {
        return await AxiosInstance.get(`/get_suppliers?token=${process.env.FORSAGE_TOKEN}`);
    }

    async getProductsBySupplier({ supplierId, date, quantity }): Promise<any> {
        return await AxiosInstance.get(`/get_products_by_supplier/${supplierId}?token=${process.env.FORSAGE_TOKEN}&date=${date}&quantity=${quantity}`);
    }

    async getBrands(): Promise<any> {
        return await AxiosInstance.get(`/get_brands?token=${process.env.FORSAGE_TOKEN}`);
    }
}
