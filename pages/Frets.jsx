import React from 'react'
import styles from '../styles/Styles.module.css'

export const Frets = ( { stringNoteLayout } ) => {

    console.log(stringNoteLayout)

  return (
    <div className={styles.frets}>
        {
           stringNoteLayout.map((note) => 
            <div className={styles.individualNotes}>{note}</div>
           )
        }
    </div>
  )
}
