import { fakerPT_BR as faker } from '@faker-js/faker';
import { IMovement } from '../../domain/moviment';
import { IProduct } from '../../domain/product';
import { v7 as uuid } from 'uuid'

const CONFIG = {
    DATE_INIT: '2020-01-01',
    DATE_LIMIT: '2025-12-31',
    QTD_MIN: -1000,
    QTD_LIMIT: 1000
}


export class DataFakerMoviments {
    private static lastId = 0;

    private static generate(products: IProduct[]): IMovement {
        DataFakerMoviments.lastId += 1;

        const between = faker.date.between({
            from: new Date(CONFIG.DATE_INIT),
            to: new Date(CONFIG.DATE_LIMIT),
        });

        const product = faker.helpers.arrayElement(products);

        return {
            id: uuid(),
            create_at: between.toISOString(),
            description: product.name,
            cod_product: product.id,
            qtd: faker.number.int({ min: CONFIG.QTD_MIN, max: CONFIG.QTD_LIMIT }),
        };
    }

    static generateMany(count: number, products: IProduct[]): IMovement[] {
        return Array.from({ length: count }, () => this.generate(products));
    }
}
