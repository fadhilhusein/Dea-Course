import React from 'react';
import styles from './index.module.css';
import Image from 'next/image';
import { useCartDispatch } from '@/context/CartContext';

const ProductList = ({ products }) => {
  const dispatch = useCartDispatch();

  console.log('i got re rendered')
  const handleAddToCart = product => {
    dispatch({
      type: 'add',
      payload: product
    })
  }

  return (
    <div className={styles['product-list']}>
      {products.map((product, index) => {
        return (
          <div 
            key={index}
            className={styles['product-list__product-card']}
          >
            <div className={styles['product-list__product-card__image']}>
              <Image 
                src={product.img_product}
                alt={product.name}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className={styles['product-list__product-card__desc']}>
              <p>{product.name}</p>
              <button onClick={() => handleAddToCart(product)}>+</button>
            </div>
            <div className={styles['product-list__product-card__desc-2']}>
              <h5><sup>Rp. </sup>{product.price}</h5>
              <h5 className={styles['product-list__product-card__desc-2__stock']}>Stock: <span>{product.stock}</span></h5>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProductList;