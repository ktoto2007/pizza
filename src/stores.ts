import {create} from 'zustand'
import { mock } from './mock-data.ts'

export type ProductType = {
    id: string
    type: string
    name: string
    prices: number[]
    url: string
    description: string
    isOn: boolean
}

interface ProductsStore {
    products: ProductType[]
    currentType: string
    addProduct: (newProduct: ProductType) => void
    setCurrentType: (type: string) => void
}

export const useProducts = create<ProductsStore>((set) => ({
    products: mock,
    currentType: 'pizza',
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