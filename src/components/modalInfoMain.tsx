import { useCart, useProducts} from "../stores"
import { useShallow } from "zustand/shallow"
import styles from '../pages/mainPage/App.module.css'
import { useEffect, useState } from "react"
import { extras, type ExtraItem } from "../mock-data"

type VariantProps = {
  variant: {
    value: string;
    price: string;
    weight: string;
  }
  setVariant: (variant: VariantProps["variant"]) => void
  selectedVariant: VariantProps["variant"] | undefined
}

const Variant = (props: VariantProps) => {
  const handleClick = () => {
    props.setVariant(props.variant)
  }
  const color = props.variant === props.selectedVariant ? '#ffffff' : '#F3F3F7' 
  return (
    <div style={{backgroundColor: color}} onClick={handleClick} className={styles.variant}>{props.variant.value}</div>
  )
}

type ExtraItemProps = {
  name: string, 
  price: number,
  url: string,
}

const ExtraItem = (props: ExtraItemProps) => {
  return (
    <div className={styles.extraItem}>
      <img className={styles.extraItemImg} src={props.url} alt="" />
      <div className={styles.extraItemName}>{props.name}</div>
      <div className={styles.extraItemPrice}>{props.price} ₽</div>
    </div>
  )
}

type ModalInfoProps = {
  display: string
  onCloseButtonClick: () => void
}

export const ModalInfoMain = (props: ModalInfoProps) => {
  const {selectedProduct, setSelectedProduct} = useProducts(useShallow(state => ({
    selectedProduct: state.selectedProduct,
    setSelectedProduct: state.setSelectedProduct
  })))

  const {addToCart} = useCart(useShallow(state => ({
    addToCart: state.addToCart
  })))

  const handleClose = () => {
    setSelectedProduct(null)
    props.onCloseButtonClick()
  }

  const [selectedVariant, setSelectedVariant] = useState<VariantProps["variant"]>()

  useEffect(() => {
    if (selectedProduct) {
      setSelectedVariant(selectedProduct.variants[0])
    }
  }, [selectedProduct])
  
  const handleClick = () => {
    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      url: selectedProduct.url,
      variant: selectedVariant.value,
      price: Number(selectedVariant.price),
      quantity: 1
    })
    handleClose()
  }

  const [selectedExtras, setSelectedExtras] = useState([])

  const extrasMap = {
    pizza: extras.pizzaExtras,
    snack: extras.sauces,
    drink: extras.syrups,
  }
  const renderExtras = () => {
    const list = extrasMap[selectedProduct?.category as keyof typeof extrasMap]

    if (!list) return null

    return (
      <div>
        <div className={styles.extrasLabel}>Добавить по вкусу</div>
        <div className={styles.extras}>
          {list.map((e) => (<ExtraItem {...e} />))}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.modalContainer} style={{display: props.display}}>
      <div className={styles.modalContent}>
        <img className={styles.modalLeft} src={selectedProduct?.url} alt="" />
        <div className={styles.modalRight}>
          <div className={styles.title}>{selectedProduct?.name}</div>
          <div className={styles.weightAndVariant}>{selectedVariant?.value}, {selectedVariant?.weight}</div>
          <div className={styles.variants}>{selectedProduct?.variants.map(v => <Variant selectedVariant={selectedVariant} setVariant={setSelectedVariant} variant={v}/>)}</div>
          <div className={styles.descriptionInModal}>{selectedProduct?.description}</div>
          {renderExtras()}
          <div onClick={handleClick} className={styles.addToCart}>В корзину за {selectedVariant?.price} ₽</div>
        </div>
        <img onClick={handleClose} className={styles.closeButton} src="src\assets\close2.svg" alt="" />
      </div>
    </div>
  )
}