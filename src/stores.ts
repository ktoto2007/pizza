import {create} from 'zustand'
import { mock } from './mock-data.ts'

export type ProductType = {
    id: string
    category: string
    name: string
    prices: number[]
    url: string
    description: string
    isOn: boolean
}

interface ProductsStore {
    products: ProductType[]
    currentCategory: string
    addProduct: (newProduct: ProductType) => void
    setCurrentCategory: (type: string) => void
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
    currentCategory: 'pizza',
    addProduct: (newProduct) => {
        set(
            state=>({...state, products: [...state.products, newProduct]})
        )
    },
    setCurrentCategory: (category) => {
        set(
            state=>({...state, currentCategory: category})
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