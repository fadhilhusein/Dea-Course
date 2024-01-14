import { useState } from 'react'
import styles from '../styles/Home.module.css'
import pocoyo from '../pictures/pocoyo.jpeg'
import Image from 'next/image'



export default function Gabut() {
    const [popup, setPopup] = useState({condition: false, clicked: 0})

    const clickHandler = () => {
        if(popup.clicked === 0) setPopup({condition: true, clicked: 1});
        else setPopup({condition: false, clicked: 0});
    }
    
    return (
        <div className={styles.wrapper}>
            <h1>MOZAAA</h1>
            <button className={styles.button} onClick={() => clickHandler()}>Tekan Aku!</button>
            {popup.condition ? <div className={styles.message}><h3>Mapp yaaa mozaaa pleasee 😭😭😭😭</h3><Image src={pocoyo} alt='TOLONGG' /></div> : ''}
        </div>
    )
}