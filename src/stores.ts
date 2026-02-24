import {create} from 'zustand'

export type ProductType = {
    type: string
    name: string
    prices: []
    url: string
    isOn: boolean
}

interface ProductsStore {
    products: ProductType[]
    currentType: string
    addProduct: (newProduct: ProductType) => void
    setCurrentType: (type: string) => void
}

export const useMessage = create<ProductsStore>((set) => ({
    products: [],
    currentType: '',
    addProduct: (newProduct) => {
        set(
            state=>({...state, products: [...state.products, newProduct]})
        )
    },
    setCurrentType: (type) => {
        set(
            state=>({...state, currentType: type})
        )
    }
}))