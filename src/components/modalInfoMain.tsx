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

type ExtraItemProps = {
  extra: ExtraItem
  toggleExtra: (extra: ExtraItem) => void
  selected: boolean
}

type ModalInfoProps = {
  display: string
  onCloseButtonClick: () => void
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

const ExtraItem = (props: ExtraItemProps) => {
  const {name, price, url} = props.extra
  
  return (
    <div 
      onClick={() => props.toggleExtra(props.extra)} 
      className={styles.extraItem}
      style={{border: props.selected ? 'solid 1px #FF6900' : 'solid 2px transparent'}}
    >
      <img className={styles.extraItemImg} src={url} alt="" />
      <div className={styles.extraItemName}>{name}</div>
      <div className={styles.extraItemPrice}>{price} ₽</div>
    </div>
  )
}

const extrasMap = {
    pizza: extras.pizzaExtras,
    snack: extras.sauces,
}

export const ModalInfoMain = (props: ModalInfoProps) => {
  const {selectedProduct, setSelectedProduct} = useProducts(useShallow(state => ({
    selectedProduct: state.selectedProduct,
    setSelectedProduct: state.setSelectedProduct
  })))
  const {addToCart} = useCart(useShallow(state => ({
    addToCart: state.addToCart
  })))

  const [selectedVariant, setSelectedVariant] = useState<VariantProps["variant"]>()
  const [selectedExtras, setSelectedExtras] = useState<ExtraItem[]>([])

  useEffect(() => {
    if (selectedProduct) {
      setSelectedVariant(selectedProduct.variants[0])
    }
  }, [selectedProduct])

  const handleClose = () => {
    setSelectedProduct(null)
    props.onCloseButtonClick()
    setSelectedExtras([])
  }
  
  const handleAddToCart = () => {
    if (!selectedProduct || !selectedVariant) return null
    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      url: selectedProduct.url,
      variant: selectedVariant.value ,
      price: Number(selectedVariant.price) + extrasPrice,
      quantity: 1,
      selectedExtras: selectedExtras
    })
    handleClose()
  }

  const toggleExtra = (extra: ExtraItem) => {
    const exists = selectedExtras.some((e) => e.name === extra.name)
    if (exists) {
      setSelectedExtras(prev => prev.filter(e => e.name !== extra.name))
    }
    else {
      setSelectedExtras(prev => [...prev, extra])
    }
  }

  const renderExtras = () => {
    const list = extrasMap[selectedProduct?.category as keyof typeof extrasMap]

    if (!list) return null

    return (
      <div>
        <div className={styles.extrasLabel}>Добавить по вкусу</div>
        <div className={styles.extras}>
          {list.map((e) => {
            const selected = selectedExtras.some(extra => e.name === extra.name)
            return <ExtraItem extra={e} selected={selected} toggleExtra={toggleExtra} />
          })}
        </div>
      </div>
    )
  }

  const extrasPrice = selectedExtras.reduce((sum, extra) => sum + extra.price, 0)

  return (
    <div className={styles.modalContainer} style={{display: props.display}}>
      <div className={styles.modalContent}>
        <img className={styles.modalLeft} src={selectedProduct?.url} alt="" />
        <div className={styles.modalRight}>
          <div className={styles.title}>{selectedProduct?.name}</div>
          <div className={styles.weightAndVariant}>{selectedVariant?.value}, {selectedVariant?.weight}</div>
          <div className={styles.variants}>
            {selectedProduct?.variants.map(v => <Variant selectedVariant={selectedVariant} setVariant={setSelectedVariant} variant={v}/>)}
          </div>
          <div className={styles.descriptionInModal}>{selectedProduct?.description}</div>
          {renderExtras()}
          <div onClick={handleAddToCart} className={styles.addToCart}>В корзину за {Number(selectedVariant?.price) + extrasPrice} ₽</div>
        </div>
        <img onClick={handleClose} className={styles.closeButton} src="src\assets\close2.svg" alt="" />
      </div>
    </div>
  )
}