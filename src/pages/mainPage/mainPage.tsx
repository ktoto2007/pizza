import { useState, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useModal, useProducts, type ProductType } from "../../stores"
import styles from './App.module.css'

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
    <div onClick={e => setCurrentCategory(type)} className={styles.navElement}>{props.name}</div>
  )
}

type ProductCardProps = {
  id: string
}

const ProductCard = (props: ProductCardProps) => {
  const {products, setSelectedProduct} = useProducts(useShallow(state => ({
    products: state.products,
    setSelectedProduct: state.setSelectedProduct
  })))
  let product = products.find((product) => product.id === props.id) as ProductType

  return (
    <div className={styles.product}>
      <img className={styles.productImg} src={product.url} alt="" />
      <div className={styles.productName}>{product.name}</div>
      <div className={styles.description}>{product.description}</div>
      <div className={styles.productPrice}>от {product.prices[0]} ₽</div>
    </div>
  )
}

const ProductsList = () => {
  const {products} = useProducts(useShallow(state => ({
    products: state.products,
  })))
  const categoryOrder = ['pizza', 'combo', 'drink', 'snack', 'dessert']
  const headers = ['Пиццы', 'Комбо', 'Напитки', 'Закуски', 'Десерты']
  const grouped = categoryOrder.flatMap((category) => {
    const items = products.filter(p => p.category === category && p.isOn)
    return [
      {type: 'header', title: headers[categoryOrder.indexOf(category)]},
      ...items.map(item => ({type: 'product', ...item}))
    ]
  })
  const renderContent = () => {
    return grouped.map((item) => {
      if (item.type === 'header') {
        return <h2 style={{width: '100%'}}>{item.title}</h2>
      }
      return <ProductCard id={item.id}/>
    })
  }
  return (
    <div className={styles.productsList}>
      {renderContent()}
    </div>
  )
}

export function Main() {
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img className={styles.logo} src="src\assets\logo.svg" alt="" />
        <div className={styles.loginButton}>Войти</div>
      </div>
      <div className={styles.nav}>
        <div className={styles.categorySelect}>
          <NavElement name='Пиццы'/>
          <NavElement name='Комбо'/>
          <NavElement name='Напитки'/>
          <NavElement name='Закуски'/>
          <NavElement name='Десерты'/>
        </div>
        <div className={styles.cart}>Корзина</div>
      </div>
      <ProductsList/>
    </div>
  )
}
