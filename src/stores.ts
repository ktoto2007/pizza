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
    selectedProduct: ProductType | null
    setSelectedProduct: (product: ProductType | null) => void
    updateProduct: (product: ProductType) => void
    deleteProduct: (id: string) => void
}

interface ModalStore {
    display: string
    setModalDisplay: (display: string) => void
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
    },
    selectedProduct: null,
    setSelectedProduct(product) {
        set(
            state=>({...state, selectedProduct: product})
        )
    },
    updateProduct(updated) {
        set(
            state=>({...state, products: state.products.map((p) => p.id === updated.id ? updated : p)})
        )
    },
    deleteProduct(id) {
        set(
            state=>({...state, products: state.products.filter((p) => p.id !== id)})
        )
    },
}))

export const useModal = create<ModalStore>((set) => ({
    display: 'none',
    setModalDisplay: (display) => {
        set(
            state=>({...state, display: display})
        )
    }
}))