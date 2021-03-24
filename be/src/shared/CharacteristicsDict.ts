import {Injectable} from "@nestjs/common";
import * as _ from "lodash";

@Injectable()
export class CharacteristicsDict {
    dict: object = {};
    constructor() {
    }

    normalizeRes(characteristics: object): object {
        const characteristic = _.values(characteristics);
        const values = characteristic.map((ch) => {
            let obj = {};
            if (ch.name === "Комментарии (доп. описание)") {
                obj = {...obj, description: ch.value};
            }

            if (ch.name === "Фото 1") {
                obj = {...obj, photo1: ch.value};
            }

            if (ch.name === "Цвет") {
                obj = {...obj, color: ch.value};
            }

            if (ch.name === "Материал изделия") {
                obj = {...obj, material: ch.value};
            }

            if (ch.name === "Размерная сетка") {
                obj = {...obj, size: ch.value};
            }

            if (ch.name === "Повторные размеры") {
                obj = {...obj, dimensions: ch.value}
            }

            if (ch.name === "Пар в ящике") {
                obj = {...obj, steamInTheBox: ch.value};
            }

            if (ch.name === "Материал подкладки") {
                obj = {...obj, liningMaterial: ch.value};
            }

            if (ch.name === "Материал подошвы") {
                obj = {...obj, outsoleMaterial: ch.value};
            }

            if (ch.name === "Страна") {
                obj = {...obj, country: ch.value};
            }

            if (ch.name === "Высота каблука, см") {
                obj = {...obj, heelHeight: ch.value};
            }
        });
       return {};
    }
}