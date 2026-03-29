import { useState, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useProducts, type ProductType } from "../../stores"
import Switch from '@mui/material/Switch';
import './admin.css'
import { Modal } from '../../components/modal';

type NavElementProps = {
  name: string;
}

const NavElement = (props: NavElementProps) => {
  const {setCurrentType} = useProducts(useShallow(state => ({
    setCurrentType: state.setCurrentType
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
    <div onClick={e => setCurrentType(type)} className='navElement'>{props.name}</div>
  )
}

type ProductProps = {
  id: string
  onEdit: (product: ProductType) => void
}

const Product = (props: ProductProps) => {
  const {products} = useProducts(useShallow(state => ({
    products: state.products
  })))
  let {name, prices, url} = products.find((product) => product.id === props.id) as ProductType
  return (
    <div className='product'>
      <div className='product-left'>
        <img className='product-img' src={url} alt="" />
        <div className='product-name'>{name}</div>
        <div className='product-price'>{prices.join('/')}₽</div>
      </div>
      <div className='product-right'>
        <Switch disableRipple defaultChecked
          sx={{
            transform: "scale(1.5)",
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#FF791B',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#FF791B',
            },
          }}
        />
        <img className='edit-button' src="src\assets\edit.svg" alt="" />
        <img className='delete-button' src="src\assets\Trash.svg" alt="" />
      </div>
    </div>
  )
}

const ProductsList = () => {
  const {products, currentType} = useProducts(useShallow(state => ({
    products: state.products,
    currentType: state.currentType
  })))
  return (
    <div className='products-container'>
      {products.filter(product => product.type === currentType).map((product) => <Product id={product.id} onEdit={(product) => {}}/>)}
    </div>
  )
}

export function Admin() {
  const [display, setDisplay] = useState('none')
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null)
  const openModal = () => {
    setDisplay("flex")
    setSelectedProduct(null)
  }
  const closeModal = () => {
    setDisplay('none')                
  }
  return (
    <div className='container'>
      <div className='header'>
        <div className='header-left'>
          <img className='logo' src="src\assets\logo.svg" alt="" />
          <Modal show={display} onCLoseButtonCLick={closeModal}></Modal>
          <div className='nav'>
            <NavElement name='Пиццы'/>
            <NavElement name='Комбо'/>
            <NavElement name='Напитки'/>
            <NavElement name='Закуски'/>
            <NavElement name='Десерты'/>
          </div>
        </div>
        <div onClick={openModal} className='addButton'>Добавить</div>
      </div>
      <ProductsList/>
    </div>
  )
}