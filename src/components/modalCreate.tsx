import { useEffect, useState } from "react"
import { useProducts, useModal} from "../stores"
import { useShallow } from "zustand/shallow"

type VariantRowProps = {
	variant: {
    value: string;
    price: string;
    weight: string;
	}
	index: number
	updateVariant: (index: number, field: string, newValue: string) => void
	removeVariant: (index: number) => void
}

const VariantRow = (props: VariantRowProps) => {
	return (
		<div className="variant-row">
			<input className="input"
				style={{width: 155}}
				type="text"
				value={props.variant.value}
				onChange={(e) => props.updateVariant(props.index, "value", e.target.value)}
				placeholder="Вариация продукта" 
			/>
			<input className="input"
				style={{width: 90}}
				type="text"
				value={props.variant.price}
				onChange={(e) => props.updateVariant(props.index, "price", e.target.value)}
				placeholder="Цена"
			/>
			<input className="input"
				style={{width: 65}}
				type="text"
				value={props.variant.weight}
				onChange={(e) => props.updateVariant(props.index, "weight", e.target.value)}
				placeholder="Вес"
			/>
			<img className="delete-variant-btn" src="src\assets\Trash.svg" alt="" onClick={() => props.removeVariant(props.index)}/>
		</div>
	)
}

export const Modal = () => {
	const [name, setName] = useState('')
	const [category, setCategory] = useState('')
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
		setVariants([{ value: "", price: "", weight: "" },])
		setDescription("")
		setAlertVisibility('none')
		setSelectedProduct(null)
	}

  const handleCreate = () => {
		if (name && category && variants[0].price && variants[0].value && variants[0].weight && description) {
			if (selectedProduct) {
				updateProduct({
					...selectedProduct,
					category, 
					name, 
					description, 
					variants
				})
			}
			else {
				addProduct({
					id: crypto.randomUUID(), 
					category,
					name,
					variants,
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
			setVariants(selectedProduct.variants)
			setDescription(selectedProduct.description)
		} 
		else {
			setName('')
			setCategory('')
			setVariants([{ value: "", price: "", weight: "" },])
			setDescription('')
		}
	}, [selectedProduct])

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

	return (
		<div style={{display: display}} className="modal-container">
			<div className="modal-content">
				<div className="modal-header">
					<div style={{fontSize: 32}}>Добавить</div>
					<img className="closeButton" onClick={handleClose} src="src\assets\close.svg" alt=""/>
				</div>
				<div className="input-label b">Название</div>
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
				<div>Вариации</div>
				<div className="variants">
					{variants.map((v, index) => <VariantRow variant={v} index={index} removeVariant={removeVariant} updateVariant={updateVariant}/>)}
					<div className="add-variant-btn" onClick={addVariant}>+ Добавить вариант</div>
				</div>

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