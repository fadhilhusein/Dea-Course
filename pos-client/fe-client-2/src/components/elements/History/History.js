import React from "react";
import styles from "./index.module.css"

const History = ({ transactions }) => {
    console.log(transactions);
    return (
        <div className={styles['transaction-list']}>
            {transactions.map((transaction, index) => {
                return (
                    <div key={index}
                    className={styles['transaction-list__transaction-card']}>
                        <h4>No.order: {transaction['no_order']}</h4>
                        <div className={styles['transaction-list__transaction-card__desc']}>
                            <div className={styles['transaction-list__transaction-card__desc__item']}>
                                <h5>Jumlah Barang:</h5>
                                {transaction.products.map(products => {
                                    return (
                                    <p>{products.product} Jumlah : {products.quantity}</p>
                                )
                            })}
                            </div>
                            <div className={styles['transaction-list__transaction-card__desc__price']}>
                                <h5>Jumlah Harga:</h5>
                                <p>total harga : {transaction['total_price']}</p>
                                <p>dibayar : {transaction['paid_amount']}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default History;