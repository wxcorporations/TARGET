import { DataFakerProducts } from "../infrastructure/repositories/data-fake-products";
import { IProduct } from "../domain/product";

export class CreateProduts {
    private _data: IProduct[] = []
    private readonly _qtd: number = 0

    constructor(qtd: number) {
        this._qtd = qtd
    }

    getData(): IProduct[] {
        return this._data
    }

    execute() {
        this._data = DataFakerProducts.generateMany(this._qtd)
    }
}