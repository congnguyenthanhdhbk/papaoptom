import {Injectable} from "@nestjs/common";
import * as _ from "lodash";

@Injectable()
export class CurrencyRate {
    // UHA currency
    readonly CURRENCY_RHA: string = "гривна";

    convertCurrency({ type, value }): string {
        return _.isEqual(type, this.CURRENCY_RHA) ? value
            : parseInt(value, 2) * parseInt(process.env.CURRENCY_RATE, 2);
    }
}