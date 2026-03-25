import { useState } from "react"
import { useProducts } from "../stores"
import { useShallow } from "zustand/shallow"

type ModalProps = {
    show: string
    onCLoseButtonCLick: () => void
    name?: string
    category?: string
    price?: string
    description?: string
}

export const Modal = (props: ModalProps) => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [alertVisibility, setAlertVisibility] = useState('none')
    const {addProduct} = useProducts(useShallow(state => ({
        addProduct: state.addProduct
    })))
    return (
        <div style={{display: props.show}} className="modal-container">
            <div className="modal-content">
                <div className="modal-header">
                    <div style={{fontSize: 32}}>Добавить</div>
                    <img className="closeButton" onClick={() => {props.onCLoseButtonCLick(), setName(""), setCategory(""), setPrice(""), setDescription(""), setAlertVisibility('none')}} src="src\assets\close.svg" alt=""/>
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
                <input value={price} onChange={e => {setPrice(e.target.value)}} className="input" type="text" placeholder="Цена"/>
                <div className="input-label">Описание</div>
                <textarea className="input" value={description} onChange={e => {setDescription(e.target.value)}} style={{height: 140, resize:"none"}}></textarea>
                <input type="file"/>
                <div onClick={() => {
                    if (name !== '' && category !== '' && price !== '' && description !== '') {
                        props.onCLoseButtonCLick()
                        addProduct({id: crypto.randomUUID(), type: category, name, prices: [parseInt(price)], url: "", isOn: true, description})
                        setName(""), setCategory(""), setPrice(""), setDescription(""), setAlertVisibility('none')
                    }
                    else {setAlertVisibility('flex')}
                }} className="submit-button">Добавить</div>
                <div className="alert" style={{display: alertVisibility}}>Заполнены не все поля!</div>
            </div>
        </div>
    )
}