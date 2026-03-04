type ModalProps = {
    show: boolean
    onCloseButtonClick: boolean
}

export const Modal = (props: ModalProps) => {
    if (!props.show) {
        return null
    }
    return (
        <div className="modal">
            <div className='addText'>Добавить</div>
            <img className='closeButton' src="src\assets\close.svg" alt="" />
        </div>
    )
}