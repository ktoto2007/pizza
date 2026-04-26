import { useEffect, useState } from "react"
import { useProducts, useModal} from "../stores"
import { useShallow } from "zustand/shallow"

type RadioButtonsType = {
	type: string
	setType: (value: "Размер" | "Объем" | "Количество") => void
}
const RadioButtons = (props: RadioButtonsType) => {
	return (
		<div className="radio-buttons">
			<label className="radio-box">
				<input type="radio" value="Размер" checked={props.type === 'Размер'} name="type" id="" onChange={(e) => props.setType(e.target.value)}/> Размер
			</label>
			<label className="radio-box">
				<input type="radio" value="Количество" name="type" id="" onChange={(e) => props.setType(e.target.value)}/> Количество
			</label>
			<label className="radio-box">
				<input type="radio" value="Объем" name="type" id="" onChange={(e) => props.setType(e.target.value)}/> Объем
			</label>
		</div>
	)
}

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
	type VariantType = "Размер" | "Объем" | "Количество"
	const [type, setType] = useState<VariantType>('Размер')

	const [variants, setVariants] = useState([
  	{ value: "", price: "", weight: "" },
	])

	const addVariant = () => {
		setVariants(prev => [
			...prev,
			{value: "", price: "", weight: ""}
		])
	}

	const updateVariant = (index: number, field: string, newValue: string) => {
		setVariants(prev =>
			prev.map((v, i) =>
				i === index ? { ...v, [field]: newValue } : v
			)
		)
	}

	const removeVariant = (index: number) => {
		setVariants(prev =>
			prev.filter((_, i) => i !== index)
		)
	}

	const variantTemplates = {
		"Размер": [
			{ value: "Маленькая(25 см)", price: "", weight: "" },
			{ value: "Средняя(30 см)", price: "", weight: "" },
			{ value: "Большая(35 см)", price: "", weight: "" },
		],
		"Объем": [
			{ value: "0.3 л", price: "", weight: "" },
			{ value: "0.5 л", price: "", weight: "" },
			{ value: "1 л", price: "", weight: "" },
		],
		"Количество": [
			{ value: "4 шт", price: "", weight: "" },
			{ value: "6 шт", price: "", weight: "" },
			{ value: "8 шт", price: "", weight: "" },
		],
	}

	useEffect(() => {
		const template = variantTemplates[type]

		if (!template) return

		setVariants(
			template.map(v => ({
				id: crypto.randomUUID(),
				...v
			}))
		)
	}, [type])

	return (
		<div style={{display: display}} className="modal-container">
			<div className="modal-content">
				<div className="modal-header">
					<div style={{fontSize: 32}}>Добавить</div>
					<img className="closeButton" onClick={handleClose} src="src\assets\close.svg" alt=""/>
				</div>
				<div className="input-div">Название</div>
				<input value={name} onChange={e => {setName(e.target.value)}} className="input" type="text" placeholder="Название"/>
				<div className="input-div">Категория</div>
				<select value={category} onChange={e => {setCategory(e.target.value)}} className="category-select">
					<option value="">Категория</option>
					<option value="pizza">Пицца</option>
					<option value="combo">Комбо</option>
					<option value="snack">Закуски</option>
					<option value="drink">Напитки</option>
					<option value="dessert">Десерты</option>
				</select>
				<div>Тип вариаций цены</div>
				<RadioButtons type={type} setType={setType}/>
				<div>Вариации</div>
				<div className="variants">
					{type} Цены Вес
					{variants.map((v, index) => (
						<div className="variant-row">
							<input className="input"
								style={{width: 150}}
								type="text"
								value={v.value}
								onChange={(e) => updateVariant(index, "value", e.target.value)}
								placeholder={type} 
							/>
							<input className="input"
								style={{width: 100}}
								type="text"
								value={v.price}
								onChange={(e) => updateVariant(index, "price", e.target.value)}
								placeholder="Цена"
							/>
							<input className="input"
								style={{width: 75}}
								type="text"
								value={v.weight}
								onChange={(e) => updateVariant(index, "weight", e.target.value)}
								placeholder="Вес"
							/>
							<img className="delete-variant-btn" src="src\assets\Trash.svg" alt="" onClick={() => removeVariant(index)}/>
						</div>
					))}
					<div className="add-variant-btn" onClick={addVariant}>+ Добавить {type.toLowerCase()}</div>
				</div>

				<div className="input-div">Описание</div>

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