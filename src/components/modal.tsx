import { useState } from "react"

type ModalProps = {
    show: string
    onCLoseButtonCLick: () => void
}

export const Modal = (props: ModalProps) => {
    return (
        <div style={{display: props.show}} className="modal-container">
            <div className="modal-content">
                <div>Добавить</div>
                <div className="input-label">Название</div>
                
                <div onClick={props.onCLoseButtonCLick} className="closeButton">Закрыть окно</div>
            </div>
        </div>
    )
}