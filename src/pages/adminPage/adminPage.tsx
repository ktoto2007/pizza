import { useState, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useModal, useProducts, type ProductType } from "../../stores"
import Switch from '@mui/material/Switch';
import './admin.css'
import { Modal } from '../../components/modalCreate';
import { ModalInfo } from '../../components/modalInfo';
import { useNavigate } from 'react-router-dom'

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
    <div onClick={() => setCurrentCategory(type)} className='navElement'>{props.name}</div>
  )
}

type ProductProps = {
  product: ProductType
  openModal: () => void
}

const Product = (props: ProductProps) => {
  const {setSelectedProduct, deleteProduct, toggleProduct} = useProducts(useShallow(state => ({
    setSelectedProduct: state.setSelectedProduct,
    deleteProduct: state.deleteProduct,
    toggleProduct: state.toggleProduct
  })))

  const {setModalDisplay} = useModal(useShallow(state => ({
    setModalDisplay: state.setModalDisplay
  })))

  const {id, name, variants, url, isOn} = props.product
  const prices = variants.map((v) => v.price)
  
  return (
    <div className='product'>
      <div className='product-left'>
        <img className='product-img' src={url} alt="" />
        <div onClick={() => {props.openModal(); setSelectedProduct(props.product)}} className='product-name'>{name}</div>
        <div className='product-price'>{prices.join('/')}₽</div>
      </div>
      <div className='product-right'>
        <Switch onChange={() => toggleProduct(id)} disableRipple checked={isOn}
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
        <img className='edit-button' onClick={() => {setModalDisplay('flex'), setSelectedProduct(props.product)}} src="src\assets\edit.svg" alt="" />
        <img className='delete-button' onClick={() => deleteProduct(id)} src="src\assets\Trash.svg" alt="" />
      </div>
    </div>
  )
}

type ProductsListProps = {
  filterText: string
  openModal: () => void
  sortType: string
}

const ProductsList = (props: ProductsListProps) => {
  const {products, currentCategory} = useProducts(useShallow(state => ({
    products: state.products,
    currentCategory: state.currentCategory
  })))
  
  const getPrice = (p: ProductType) => +p.variants[0].price
  
  const sortMap: Record<string, (a: ProductType, b: ProductType) => number> = {
    "price-asc": (a, b) => getPrice(a) - getPrice(b),
    "price-desc": (a, b) => getPrice(b) - getPrice(a),

    "name-asc": (a, b) => a.name.localeCompare(b.name),
    "name-desc": (a, b) => b.name.localeCompare(a.name),
  }

  const renderContent = () => {
    if (props.filterText === '') {
      if (props.sortType !== 'none') {
        return [...products].filter((product) => product.category === currentCategory)
        .sort(sortMap[props.sortType])
        .map((product) => <Product openModal={props.openModal} product={product}/>)
      }
      return products.filter((product) => product.category === currentCategory)
      .map((product) => <Product openModal={props.openModal} product={product}/>)
    }
    else {
      return products.filter(product => {
        return product.name.toLowerCase().includes(props.filterText.toLowerCase())
      }).map((product) => <Product openModal={props.openModal} product={product}/>)
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
  const [sortVisibility, setSortVisibility] = useState<React.CSSProperties['visibility']>('hidden')
  const [display, setDisplay] = useState('none')
  const [sortType, setSortType] = useState('none')

  const openModal = () => {
    setDisplay('flex')
  }

  const closeModal = () => {
    setDisplay('none')
  }

  const navigate = useNavigate()

  return (
    <div className='container'>
      <div className='header'>
        <div className='header-left'>
          <img className='logo' src="src\assets\logo.svg" alt="" />
          <Modal/>
          <ModalInfo display={display} onCloseButtonClick={closeModal}/>
          <div className='nav'>
            <NavElement name='Пиццы'/>
            <NavElement name='Комбо'/>
            <NavElement name='Напитки'/>
            <NavElement name='Закуски'/>
            <NavElement name='Десерты'/>
          </div>
        </div>
        <div onClick={() => navigate('/main')} className='addButton'>Главная</div>
        <div onClick={() => setModalDisplay('flex')} className='addButton'>Добавить</div>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', gap: 10}}>
        <input className='search' type="text" placeholder='Поиск' onChange={e => {setFilterText(e.target.value)}}/>
        <div className='content-hover' onMouseLeave={() => setSortVisibility('hidden')}>
          <img onMouseEnter={() => setSortVisibility('visible')} className='sorting' src="src\assets\sort.svg" alt="" />
          <div style={{visibility: sortVisibility}} className='sortList'>
            <div className='sort-text bt' onClick={() => setSortType('none')}>По новизне</div>
            <div className='sort-text' onClick={() => setSortType('price-asc')}>По возрастанию цены</div>
            <div className='sort-text' onClick={() => setSortType('price-desc')}>По убыванию цены</div>
            <div className='sort-text' onClick={() => setSortType('name-asc')}>А-Я</div>
            <div className='sort-text bb' onClick={() => setSortType('name-desc')}>Я-А</div>
          </div>
        </div>
      </div>
      <ProductsList sortType={sortType} filterText={filterText} openModal={openModal}/>
    </div>
  )
}
