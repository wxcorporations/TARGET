import { CreateProduts } from "./create-products";
import { CreateMoviment } from "./create-moviments";
import { LocalStorageRepository } from "../infrastructure/repositories/local-storage-repository";


const BASES_NAME = {
    PRODUCTS: 'products',
    MOVIMENTS: 'moviments'
}

export class CreateStores {

    execute() {
        if (
            LocalStorageRepository.hasBase(BASES_NAME.PRODUCTS)
            && LocalStorageRepository.hasBase(BASES_NAME.MOVIMENTS)
        ) {
            return
        }

        console.log('============ criando os dados ======================')

        const dataProducts = new CreateProduts(100)
        dataProducts.execute()

        // registar massa de dados no local storage
        const products = dataProducts.getData()


        // criar massa de dados de movimentaçoes
        const dataMoviments = new CreateMoviment(100, products)
        dataMoviments.execute()


        // criando as bases
        const localStoreProduct = new LocalStorageRepository(BASES_NAME.PRODUCTS)
        localStoreProduct.createBase(products)

        const localStoreMoviment = new LocalStorageRepository(BASES_NAME.MOVIMENTS)
        localStoreMoviment.createBase(dataMoviments.getData())
    }
}
