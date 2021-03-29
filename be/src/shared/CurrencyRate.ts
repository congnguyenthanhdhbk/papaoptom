import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class CurrencyRate {
  // UHA currency
  readonly CURRENCY_RHA: string = 'гривна';

  convertCurrency({ type, value }): string {
    return _.isEqual(type, this.CURRENCY_RHA)
      ? value
      : Number(value) * Number(process.env.CURRENCY_RATE);
  }
}
