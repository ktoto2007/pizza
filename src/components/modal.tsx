import { useEffect, useState } from "react"
import { useProducts, useModal} from "../stores"
import { useShallow } from "zustand/shallow"

export const Modal = () => {
	const [name, setName] = useState('')
	const [category, setCategory] = useState('')
	const [price, setPrice] = useState('')
	const [description, setDescription] = useState('')
	const [alertVisibility, setAlertVisibility] = useState('none')
	const {addProduct, setSelectedProduct, selectedProduct, updateProduct} = useProducts(useShallow(state => ({
			addProduct: state.addProduct,
			setSelectedProduct: state.setSelectedProduct,
			selectedProduct: state.selectedProduct,
			updateProduct: state.updateProduct
	})))
	const {setModalDisplay, display} = useModal(useShallow(state => ({
    display: state.display,
    setModalDisplay: state.setModalDisplay
  })))

  	const handleClose = () => {
		setModalDisplay('none')
		setName("")
		setCategory("")
		setPrice("")
		setDescription("")
		setAlertVisibility('none')
		setSelectedProduct(null)
	}

  	const handleCreate = () => {
		if (name && category && price && description) {
			if (selectedProduct) {
				updateProduct({
					...selectedProduct,
					category, 
					name, 
					description, 
					prices: price.split('/').map((el) => parseInt(el))
				})
			}
			else {
				addProduct({
					id: crypto.randomUUID(), 
					category,
					name,
					prices: [parseInt(price)], 
					url: "",
					isOn: true,
					description
				})
			}
			handleClose()
		}
		else {setAlertVisibility('flex')}
	}

	useEffect(() => {
		if (selectedProduct) {
			setName(selectedProduct.name)
			setCategory(selectedProduct.category)
			setPrice(selectedProduct.prices.join('/'))
			setDescription(selectedProduct.description)
		} 
		else {
			setName('')
			setCategory('')
			setPrice('')
			setDescription('')
		}
	}, [selectedProduct])

	return (
		<div style={{display: display}} className="modal-container">
			<div className="modal-content">
				<div className="modal-header">
					<div style={{fontSize: 32}}>Добавить</div>
					<img className="closeButton" onClick={handleClose} src="src\assets\close.svg" alt=""/>
				</div>
				<div className="input-label">Название</div>
				<input value={name} onChange={e => {setName(e.target.value)}} className="input" type="text" placeholder="Название"/>
				<div className="input-label">Категория</div>
				<select value={category} onChange={e => {setCategory(e.target.value)}} className="category-select">
					<option value="">Категория</option>
					<option value="pizza">Пицца</option>
					<option value="combo">Комбо</option>
					<option value="snack">Закуски</option>
					<option value="drink">Напитки</option>
					<option value="dessert">Десерты</option>
				</select>
				<div className="input-label">Цена</div>

				<input value={price} onChange={e => {setPrice(e.target.value)}}
						className="input"
						type="text"
						placeholder="Цена"/>

				<div className="input-label">Описание</div>

				<textarea className="input" value={description}
						onChange={e => {setDescription(e.target.value)}}
						style={{height: 140, resize:"none"}}/>

				<input type="file"/>

				<div onClick={handleCreate} className="submit-button">Добавить</div>
				<div className="alert" style={{display: alertVisibility}}>Заполнены не все поля!</div>
			</div>
		</div>
	)
}
// добавить поиск с фильтрацией на все страницы с листингом
// при нажатии на продукт открывать модалку со всеми данными объекта
// сделать главную страницу пользователя
// корзина, личный кабинет где можно посмотреть заказы, вход и регистрация