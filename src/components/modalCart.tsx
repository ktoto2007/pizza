import { useCart, type CartItem} from "../stores"
import { useShallow } from "zustand/shallow"
import styles from '../pages/mainPage/App.module.css'

const CartItemComponent = ({id, variant, selectedExtras, name, url, price, quantity}: CartItem) => {
  const {removeFromCart, increase, decrease} = useCart(useShallow(state => ({
    removeFromCart: state.removeFromCart,
    increase: state.increase,
    decrease: state.decrease,
  })))

  const extrasText = selectedExtras.map((e) => e.name).join(', ')

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemTop}>
        <img className={styles.cartItemImg} src={url} alt="" />
        <div className={styles.nameAndVariant}>
          <div className={styles.cartItemName}>{name}</div>
          <div className={styles.cartItemVariant}>{variant}</div>
          {
            selectedExtras.length > 0 &&
            <div className={styles.cartItemExtras}>
              + {extrasText}
            </div>
          }
        </div>
        <img className={styles.deleteItem} 
          onClick={() => removeFromCart(id, variant)}
          src="src\assets\close2.svg" alt="" 
        />
      </div>
      <div className={styles.cartItemBottom}>
        <div className={styles.cartItemPrice}>{price} ₽</div>
        <div className={styles.changeQuantity}>
          <div onClick={() => decrease(id, variant)}>-</div>
          <div>{quantity}</div>
          <div onClick={() => increase(id, variant)}>+</div>
        </div>
      </div>
    </div>
  )
}

export const Cart = () => {
  const {items, setCartDisplay, display, clearCart} = useCart(useShallow(state => ({
    display: state.display,
    setCartDisplay: state.setCartDisplay,
    items: state.items,
    clearCart: state.clearCart
  })))

  const total = items.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)

  return (
    <div className={styles.cartContainer} style={{display: display}}>
      <div className={styles.cartContent}>
        <img onClick={() => setCartDisplay('none')} src="src\assets\close2.svg" className={styles.closeCart}/>
        <div className={styles.cartItems}>
          {items.map((i) => <CartItemComponent key={i.id} {...i}/>)}
        </div>
        <div onClick={() => clearCart()} className={styles.clearCart}>Очистить корзину</div>
        <div className={styles.totalPrice}>Сумма заказа: {total} ₽</div>
        <div className={styles.buy}>К оформлению заказа</div>
      </div>
    </div>
  )
}