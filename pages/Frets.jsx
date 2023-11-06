import React from 'react'
import styles from '../styles/Styles.module.css'

const Frets = () => {

    // sharp of flat notation

    const fretDesign = (
        <div className={styles.fretDesign}>
            fret
        </div>
    )
    const notes = {
        "C": fretDesign,
        "Db": fretDesign,
        "D": fretDesign,
        "Eb": fretDesign,
        "E": fretDesign,
        "F": fretDesign,
        "Gb": fretDesign,
        "G": fretDesign,
        "Ab": fretDesign,
        "A": fretDesign,
        "Bb": fretDesign,
        "B": fretDesign,

    }

    return (
        <div className="frets">
            <div className={styles.fretboardNotes}>
                {Object.keys(notes).map((keyName, i) => (
                    <p className={styles.individualNotes}>{keyName}</p>

                ))}
            </div>
        </div>
    )
}

export default Frets