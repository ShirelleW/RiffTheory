import React, { useState } from 'react'
import styles from '../styles/Styles.module.css'

const Highlighter = ({ stringNoteLayout, i }) => {

    const [hoverNotes, setHoverNotes] = useState([0, 1, 2, 3])
    return (
        <div className={styles.hoverSlider}>
            {
                stringNoteLayout.map((note, i) =>
                    // Selected Theory Display
                    hoverNotes.includes(i) &&
                    <div className={styles.fretHover}></div>
                )
            }
        </div>
    )
}
export default Highlighter