import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './index.module.css'
import { useCart, useCartDispatch } from '@/context/CartContext';
import api from '@/api';
import Modal from '../Modal/Modal';

const Cart = () => {
  const carts = useCart();
  const dispatch = useCartDispatch();
  const [value, setValue] = useState('');
  const [modal, setModal] = useState(false);
  const [cart, setCart] = useState(false);

  console.log('i got re rendered')

  useEffect(() => {
    if(carts.length > 0) {
      setCart(true);
    } else {
      setCart(false);
    }
  })

  function handleModal() {
    setModal(false);
    
    // mengkosongkan keranjang kembali
    dispatch({
      type: 'empty'
    })

    document.removeEventListener('mousedown', handleModal);
    document.querySelector('.inputHarga').value = '';
  }

  const handleAddToCart = product => {
    dispatch({
      type: 'add',
      payload: product
    })
  }

  const handleDecreaseCart = product => {
    dispatch({
      type: 'decrease',
      payload: product
    })
  }

  if(modal) {
    document.addEventListener('mousedown', handleModal);
  }

  let totalPrice = 0;
  let product = [];

  carts.forEach(item => {
    totalPrice += item.quantity * item.price
  })

  const checkOutProducts = async () => {
      carts.forEach(item => {
        product.push({id: item.id, quantity: item.quantity}) 
      })

      const listProducts = {
        "total_price": totalPrice,
        "paid_amount": value,
        "products": product
      }

      if (totalPrice !== 0) {
        if (value >= totalPrice){
            api.post('/transactions', 
              listProducts
            )
            .then((response) => {
              console.log(response);
            }, (error) => {
              console.log(error);
            });

            setModal(!modal)
          } else {
            alert('Berikan jumlah uang yang dibayarkan!')
          }
        } else alert('Pilih product terlebih dahulu!')
    }


  return (
    <div className={`${styles.cart} ${cart? styles.active: styles.inactive}`}>
      <h3>Cart</h3>
      <div className={styles['cart__cart-list']}>
        {carts.map((cart, index) => {
          return (
            <div key={index} className={styles['cart-item']}>
              <div className={styles['cart-item__image']}>
                <Image 
                  src={cart.img_product}
                  alt={cart.name}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className={styles['cart-item__desc']}>
                <p>{cart.name}</p>
                <p>{cart.price}</p>
              </div>
              <div className={styles['cart-item__action']}>
                <button onClick={() => handleDecreaseCart(cart)}>-</button>
                <p>{cart.quantity}</p>
                <button onClick={() => handleAddToCart(cart)}>+</button>
              </div>
            </div>
          )
        })}
        <Modal totalPrice={totalPrice} active={modal}/>
        <h4>Total Price: {totalPrice}</h4>
        <div className={styles['cart-item__checkout']}>
          <div className={styles['cart-item__checkout__paid']}>
            <p>Paid Amount</p>
            <input className='inputHarga' type={'number'} onChange={e => { setValue(e.currentTarget.value); }}/>
          </div>          
          <button onClick={() => checkOutProducts()}>Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart;