import { useProducts} from "../stores"
import { useShallow } from "zustand/shallow"

type ModalInfoProps = {
    display: string
    onCloseButtonClick: () => void
}

export const ModalInfo = (props: ModalInfoProps) => {
    const {selectedProduct, setSelectedProduct} = useProducts(useShallow(state => ({
        selectedProduct: state.selectedProduct,
        setSelectedProduct: state.setSelectedProduct
    })))

    return (
        <div className="modal-container" style={{display: props.display}}>
            <div className="modal-content">
                <img className="modal-left" src={selectedProduct?.url} alt="" />
                <div className="modal-right">
                    <div>{selectedProduct?.name}</div>
                    <div>{selectedProduct?.prices}</div>
                    <div>{selectedProduct?.description}</div>
                </div>
                <img onClick={() => {setSelectedProduct(null); props.onCloseButtonClick()}} className="closeButton" src="src\assets\close.svg" alt="" />
            </div>
        </div>
    )
}