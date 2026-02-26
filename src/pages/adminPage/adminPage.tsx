import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import Switch from '@mui/material/Switch';
import './admin.css'

type NavElementProps = {
  name: string;
}

const NavElement = (props: NavElementProps) => {
  return (
    <div className='navElement'>{props.name}</div>
  )
}

type ProductProps = {
  name: string;
  prices: number[];
  url: string;
}

const Product = (props: ProductProps) => {
  return (
    <div className='product'>
      <div className='product-left'>
        <img className='product-img' src={props.url} alt="" />
        <div className='product-name'>{props.name}</div>
        <div className='product-price'>{props.prices[0]}/{props.prices[1]}/{props.prices[2]}₽</div>
      </div>
      <div className='product-right'>
        <Switch defaultChecked />
        <img className='edit-button' src="src\assets\Edit (1).svg" alt="" />
        <img className='delete-button' src="src\assets\Trash.svg" alt="" />
      </div>
    </div>
  )
}

const ProductsList = () => {
  return (
    <div className='products-container'>
      <Product name='Pepperoni' url='src\assets\Pizza (2).svg' prices={[10, 20, 30]}/>
      <Product name='Pepperoni' url='src\assets\Pizza (2).svg' prices={[10, 20, 30]}/>
    </div>
  )
}

export function Admin() {
  return (
    <div className='container'>
      <div className='header'>
        <div className='header-left'>
          <img className='logo' src="src\assets\Pizza (1).svg" alt="" />
          <div className='nav'>
            <NavElement name='Пиццы'/>
            <NavElement name='Комбо'/>
            <NavElement name='Напитки'/>
            <NavElement name='Закуски'/>
          </div>
        </div>
        <div className='addButton'>Добавить</div>
      </div>
      <ProductsList/>
    </div>
  )
}