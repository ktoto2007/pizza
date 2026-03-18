import { useState } from "react"

type ModalProps = {
    show: string
    onCLoseButtonCLick: () => void
}

export const Modal = (props: ModalProps) => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    return (
        <div style={{display: props.show}} className="modal-container">
            <div className="modal-content">
                <div className="modal-header">
                    <div style={{fontSize: 32}}>Добавить</div>
                    <img className="closeButton" onClick={props.onCLoseButtonCLick} src="src\assets\close.svg" alt=""/>
                </div>
                <div className="input-label">Название</div>
                <input onChange={e => {setName(e.target.value)}} className="input" type="text" placeholder="Название"/>
                <div className="input-label">Категория</div>
                <select onChange={e => {setCategory(e.target.value)}} className="category-select">
                    <option value="">Категория</option>
                    <option value="pizza">Пицца</option>
                    <option value="combo">Комбо</option>
                    <option value="snack">Закуски</option>
                    <option value="drink">Напитки</option>
                    <option value="dessert">Десерты</option>
                </select>
                <div className="input-label">Цена</div>
                <input className="input" type="text" placeholder="Цена"/>
                <div className="input-label">Описание</div>
                <div style={{height: 140}} contentEditable className="input"/>
                <div onClick={() => {
                    props.onCLoseButtonCLick()
                }} className="submit-button">Добавить</div>
            </div>
        </div>
    )
}