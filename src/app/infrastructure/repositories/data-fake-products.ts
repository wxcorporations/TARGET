import { fakerPT_BR as faker } from '@faker-js/faker';
import { IProduct } from '../../domain/product';

export class DataFakerProducts {
    private static lastId = 0;

    private static generate(): IProduct {
        DataFakerProducts.lastId += 1;

        return {
            id: DataFakerProducts.lastId,
            name: faker.commerce.productName(),
        };
    }

    static generateMany(count: number): IProduct[] {
        return Array.from({ length: count }, () => this.generate());
    }
}