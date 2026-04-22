import { useState, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useModal, useProducts, type ProductType } from "../../stores"
import './App.css'

type NavElementProps = {
  name: string;
}

const NavElement = (props: NavElementProps) => {
  const {setCurrentCategory} = useProducts(useShallow(state => ({
    setCurrentCategory: state.setCurrentCategory
  })))

  const [type, setType] = useState('');

  useEffect(() => {
    switch (props.name) {
      case 'Пиццы':
        setType('pizza');
        break;
      case 'Комбо':
        setType('combo');
        break;
      case 'Напитки':
        setType('drink');
        break;
      case 'Десерты':
        setType('dessert');
        break;
      case 'Закуски':
        setType('snack');
        break;
      default:
        setType('');
    }
  }, [props.name]);

  return (
    <div onClick={e => setCurrentCategory(type)} className='navElement'>{props.name}</div>
  )
}

type ProductProps = {
  id: string
}

const Product = (props: ProductProps) => {
  const {products, setSelectedProduct} = useProducts(useShallow(state => ({
    products: state.products,
    setSelectedProduct: state.setSelectedProduct
  })))
  let product = products.find((product) => product.id === props.id) as ProductType

  return (
    <div className='product'>
      <img className='product-img' src={product.url} alt="" />
      <div className='product-name'>{product.name}</div>
      <div className='description'>{product.description}</div>
      <div className='product-price'>от {product.prices[0]} ₽</div>
    </div>
  )
}

const ProductsList = () => {
  const {products} = useProducts(useShallow(state => ({
    products: state.products,
  })))
  const categoryOrder = ['pizza', 'combo', 'drink', 'snack', 'dessert']
  const grouped = categoryOrder.flatMap((category) => {
    const items = products.filter(p => p.category === category && p.isOn)
    return [
      {type: 'header', title: category},
      ...items.map(item => ({type: 'product', ...item}))
    ]
  })
  const renderContent = () => {
    
  }
  return (
    <div className='products-container'>

    </div>
  )
}

export function Main() {
  
  return (
    <div className='container'>
      <div className='header'>
        <img src="src\assets\logo.svg" alt="" />
        <div className='login-button'>Войти</div>
      </div>
      <div className='nav'>
        <div className='category-select'>
          <NavElement name='Пиццы'/>
          <NavElement name='Комбо'/>
          <NavElement name='Напитки'/>
          <NavElement name='Закуски'/>
          <NavElement name='Десерты'/>
        </div>
        <div className='cart'>Корзина</div>
      </div>
      
    </div>
  )
}
