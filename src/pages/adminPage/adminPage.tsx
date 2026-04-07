import { useState, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useModal, useProducts, type ProductType } from "../../stores"
import Switch from '@mui/material/Switch';
import './admin.css'
import { Modal } from '../../components/modal';

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
  const {products, setSelectedProduct, deleteProduct} = useProducts(useShallow(state => ({
    products: state.products,
    setSelectedProduct: state.setSelectedProduct,
    deleteProduct: state.deleteProduct
  })))

  const {setModalDisplay} = useModal(useShallow(state => ({
    setModalDisplay: state.setModalDisplay
  })))

  let product = products.find((product) => product.id === props.id) as ProductType
  let {name, prices, url} = product
  
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
        <img className='edit-button' onClick={() => {setModalDisplay('flex'), setSelectedProduct(product)}} src="src\assets\edit.svg" alt="" />
        <img className='delete-button' onClick={() => deleteProduct(props.id)} src="src\assets\Trash.svg" alt="" />
      </div>
    </div>
  )
}

type ProductsListProps = {
  filterText: string
}

const ProductsList = (props: ProductsListProps) => {
  const {products, currentCategory} = useProducts(useShallow(state => ({
    products: state.products,
    currentCategory: state.currentCategory
  })))

  const renderContent = () => {
    if (props.filterText === '') {
      return products.filter((product) => product.category === currentCategory).map((product) => <Product id={product.id}/>)
    }
    else {
      return products.filter(product => {
        const regex = new RegExp(props.filterText, 'i')
        return regex.test(product.name)
      }).map((product) => <Product id={product.id}/>)
    }
  }

  return (
    <div className='products-container'>
      {renderContent()}
    </div>
  )
}

export function Admin() {
  const {setModalDisplay} = useModal(useShallow(state => ({
    setModalDisplay: state.setModalDisplay
  })))

  const [filterText, setFilterText] = useState('')

  return (
    <div className='container'>
      <div className='header'>
        <div className='header-left'>
          <img className='logo' src="src\assets\logo.svg" alt="" />
          <Modal></Modal>
          <div className='nav'>
            <NavElement name='Пиццы'/>
            <NavElement name='Комбо'/>
            <NavElement name='Напитки'/>
            <NavElement name='Закуски'/>
            <NavElement name='Десерты'/>
          </div>
        </div>
        <div onClick={() => setModalDisplay('flex')} className='addButton'>Добавить</div>
      </div>
      <input className='search' type="text" placeholder='Поиск' onChange={e => {setFilterText(e.target.value)}}/>
      <ProductsList filterText={filterText}/>
    </div>
  )
}