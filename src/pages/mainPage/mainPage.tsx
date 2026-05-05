import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useCart, useProducts, type ProductType } from "../../stores"
import styles from './App.module.css'
import { ModalInfoMain } from '../../components/modalInfoMain'
import { Cart } from '../../components/modalCart'

type NavElementProps = {
  name: string;
}

const NavElement = (props: NavElementProps) => {
  const handleClick = () => {
    const el = document.getElementById(props.name)
    el?.scrollIntoView({behavior: "smooth"})
  }
  return (
    <div onClick={handleClick} className={styles.navElement}>{props.name}</div>
  )
}

type ProductCardProps = {
  id: string
  openModal: () => void
}

const ProductCard = (props: ProductCardProps) => {
  const {products, setSelectedProduct} = useProducts(useShallow(state => ({
    setSelectedProduct: state.setSelectedProduct,
    products: state.products,
  })))
  const product = products.find((product) => product.id === props.id) as ProductType
  const {name, variants, url, description} = product
  const handleClick = () => {
    props.openModal()
    setSelectedProduct(product)
  }

  return (
    <div onClick={handleClick} className={styles.product}>
      <img className={styles.productImg} src={url} alt="" />
      <div className={styles.productName}>{name}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.productPrice}>{variants.length > 1 ? `от ${variants[0].price}` : variants[0].price} ₽</div>
    </div>
  )
}

type ProductsListProps = {
  openModal: () => void
}

const ProductsList = (props: ProductsListProps) => {
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
        return <div key={item.title} id={item.title} className={styles.categoryHeader} style={{width: '100%'}}>{item.title}</div>
      }
      else {return <ProductCard openModal={props.openModal} id={item.id}/>}
    })
  }
  return (
    <div className={styles.productsList}>
      {renderContent()}
    </div>
  )
}

export function Main() {
  const [displayInfoModal, setDisplay] = useState('none')

  const openModal = () => {
    setDisplay('flex')
  }

  const closeModal = () => {
    setDisplay('none')
  }

  const {setCartDisplay, display, items} = useCart(useShallow(state => ({
    setCartDisplay: state.setCartDisplay,
    display: state.display,
    items: state.items
  })))

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img className={styles.logo} src="src\assets\logo.svg" alt="" />
        <div className={styles.loginButton}>Войти</div>
      </div>
      <ModalInfoMain display={displayInfoModal} onCloseButtonClick={closeModal}/>
      <Cart/>
      <div className={styles.nav}>
        <div className={styles.categorySelect}>
          <NavElement name='Пиццы'/>
          <NavElement name='Комбо'/>
          <NavElement name='Напитки'/>
          <NavElement name='Закуски'/>
          <NavElement name='Десерты'/>
        </div>
        <div onClick={() => {setCartDisplay('flex'); console.log(display)}} className={styles.cart}>Корзина</div>
      </div>
      <ProductsList openModal={openModal}/>
      <div className='footer'>
        <div></div>
      </div>
    </div>
  )
}
