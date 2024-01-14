import { useCart } from "@/context/CartContext";
import styles from './index.module.css'
import React from "react";

const Modal = ({ totalPrice, active, transactions }) => {
    const products = useCart();

    return (
        <div className={`${styles['modal-card']} ${active? styles['active']:styles['inactive']}`}>
            <div className={styles['modal-card__products']}>
                {products.map((product) => {
                    return (
                        <div key={product.id} className={styles["product"]}>
                            <h4>{product.name}</h4>
                            <p><sup>Rp. </sup>{product.price} x {product.quantity}</p>
                        </div>
                    )
                })}
            </div>
            <div className={styles['modal-card__desc']}>
                <h5 className={styles['modal-card__desc__totalPrice']}>Total: <span><sup>Rp. </sup>{totalPrice}</span></h5>
            </div>
        </div>
    );
}

export default Modal;