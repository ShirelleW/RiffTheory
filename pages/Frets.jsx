import React from 'react'
import styles from '../styles/Styles.module.css'

export const Frets = ( { stringNum, numOfStrings, stringNoteLayout } ) => {

    const oddFretInlay = Math.floor(numOfStrings / 2)

  return (
    <div className={styles.frets}>
        {
           stringNoteLayout.map((note) => 
           stringNoteLayout.indexOf(note) % 2 === 0 && Number(stringNum) === oddFretInlay ?
           <div className={styles.individualNotesOddFret}>
                <div>{note}</div>
                <div className={styles.oddFretInlay}>*</div>
           </div> :
            <div className={styles.individualNotes}>{note}</div>
           )
        }
    </div>
  )
}
