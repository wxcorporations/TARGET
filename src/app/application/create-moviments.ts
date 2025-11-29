import { DataFakerMoviments } from "../infrastructure/repositories/data-fake-moviments";
import { IMovement } from "../domain/moviment";
import { IProduct } from "../domain/product";

export class CreateMoviment {
    private _data: IMovement[] = []
    private readonly _qtd: number = 0
    private readonly _products: IProduct[] = []

    constructor(qtd: number, products: IProduct[]) {
        this._qtd = qtd
        this._products = products
    }

    getData(): IMovement[] {
        return this._data
    }

    execute() {
        this._data = DataFakerMoviments.generateMany(this._qtd, this._products)
    }
}