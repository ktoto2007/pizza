import {create} from 'zustand'
import { mock } from './mock-data.ts'

export type ProductType = {
    id: string
    category: string
    name: string
    variants: {
        value: string;
        price: string;
        weight: string;
    }[]
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
    toggleProduct: (id: string) => void
}

export const useProducts = create<ProductsStore>((set) => ({
    products: mock,
    currentCategory: 'pizza',
    addProduct: (newProduct) => {
        set(
            state=>({...state, products: [newProduct, ...state.products]})
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
    toggleProduct(id) {
        set(state => ({
            ...state,
            products: state.products.map((p) =>
            p.id === id ? { ...p, isOn: !p.isOn } : p
            )
        }))
    },
}))

interface ModalStore {
    display: string
    setModalDisplay: (display: string) => void
}

export const useModal = create<ModalStore>((set) => ({
    display: 'none',
    setModalDisplay: (display) => {
        set(
            state=>({...state, display: display})
        )
    }
}))

export type CartItem = {
  id: string
  name: string
  url: string
  variant: string
  price: number
  quantity: number
}

interface CartStore {
    items: CartItem[]
    display: string
    setCartDisplay: (display: string) => void
    addToCart: (item: CartItem) => void
    removeFromCart: (id: string, variant: string) => void
    clearCart: () => void
    increase: (id: string, variant: string) => void
    decrease: (id: string, variant: string) => void
}

export const useCart = create<CartStore>((set) => ({
    items: [],
    display: 'none',
    setCartDisplay(display) {
        set(
            state=>({...state, display: display})
        )
    },
    addToCart(item) {
        set(
            state=>{
                const existing = state.items.find((
                    i => i.id === item.id && i.variant === item.variant
                ))
                if (existing) {
                    return {
                        items: state.items.map((i => 
                            i.id === item.id && i.variant === item.variant
                            ? {...i, quantity: i.quantity + 1} 
                            : i
                        ))
                    }
                }
                return {
                    items: [...state.items, item]
                }
            }
        )
    },
    removeFromCart(id, variant) {
        set((state) => ({
            items: state.items.filter(
                i => !(i.id === id && i.variant === variant)
            )
        }))
    },
    clearCart: () => set({ items: [] }) ,
    increase: (id, variant) =>
        set((state) => ({
            items: state.items.map(item =>
            item.id === id && item.variant === variant
                ? { ...item, quantity: item.quantity + 1 }
                : item
        )
    })),

    decrease: (id, variant) =>
        set((state) => ({
            items: state.items
            .map(item =>
                item.id === id && item.variant === variant
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter(item => item.quantity > 0) // удаляем если 0
    })),
}))