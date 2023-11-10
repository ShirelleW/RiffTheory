import React from 'react'
import styles from '../styles/Styles.module.css'
import Draggable from 'react-draggable'

const Slider = ( {sliderFretRange, numOfStrings} ) => {
    return (
        <Draggable
         bounds='parent'>
        <div className={styles.slider} style={{ width: (3.15 * sliderFretRange) + 'vw', height: (7 * numOfStrings) + 'vh' }}>
        </div>
        </Draggable>
    )
}

export default Slider