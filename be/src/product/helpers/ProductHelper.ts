import { Injectable } from '@nestjs/common';
import { CurrencyRate } from '../../shared/CurrencyRate';
import * as _ from 'lodash';

@Injectable()
export class ProductHelper {
  constructor(private readonly currency: CurrencyRate) {}
  presentProduct(product: any): any {
    const characteristics = this.convertPrice(product);
    return {
      id: product?.id ?? 0,
      vcode: product?.vcode ?? null,
      name: product?.name ?? null,
      quantity: product?.quantity ?? 0,
      category: product?.category ?? {},
      supplier: product?.supplier ?? {},
      brand: product?.brand ?? {},
      createdAt: product?.createdAt ?? new Date(),
      updatedAt: product?.updatedAt ?? new Date(),
      slug: product?.sku ?? null,
      characteristics,
    };
  }

  convertPrice(product: any): any {
    const characteristic = product?.characteristics ?? {};
    const type =
      product?.characteristics?.purchaseCurrency ?? this.currency.CURRENCY_RHA;

    const purchasePrice = this.currency.convertCurrency({
      type,
      value: product?.characteristics?.purchasePrice ?? 0,
    });
    const sellingPrice = this.currency.convertCurrency({
      type,
      value: product?.characteristics?.sellingPrice ?? 0,
    });
    const oldPurchasePrice = this.currency.convertCurrency({
      type,
      value: product?.characteristics?.oldPurchasePrice ?? 0,
    });
    const oldSellingPrice = this.currency.convertCurrency({
      type,
      value: product?.characteristics?.oldSellingPrice ?? 0,
    });
    const steamInBox = product?.characteristics?.steamInBox ?? 1;

    const totalPurchasePrice = Number(purchasePrice) * Number(steamInBox);
    const totalSellingPrice = Number(sellingPrice) * Number(steamInBox);
    const totalOldPurchasePrice = Number(oldPurchasePrice) * Number(steamInBox);
    const totalOldSellingPrice = Number(oldSellingPrice) * Number(steamInBox);
    // TODO: Add percent
    const subtractSellingPrice = _.subtract(
      sellingPrice,
      oldSellingPrice,
    );
    const discountInPercent = _.round(
      _.divide(subtractSellingPrice, sellingPrice) * 100,
      0,
    ).toFixed(0);
    const gallery = [];
    const url = { url: product?.characteristics?.photo1 ?? null };
    gallery.push(url);
    gallery.push(url);
    gallery.push(url);
    gallery.push(url);

    return {
      ...characteristic,
      purchasePrice,
      sellingPrice,
      oldPurchasePrice,
      oldSellingPrice,
      totalOldPurchasePrice,
      totalOldSellingPrice,
      totalPurchasePrice,
      totalSellingPrice,
      discountInPercent,
      gallery,
    };
  }
}
