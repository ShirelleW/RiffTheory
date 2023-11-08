import React, { useContext } from 'react'
import styles from '../styles/Styles.module.css'
import { SelectedNotesContext } from './Context/SelectedNotesContext'

export const Frets = ({ stringNum, numOfStrings, stringNoteLayout }) => {

    // button that shows all notes

    const {selectedNotes, setSelectedNotes} = useContext(SelectedNotesContext)
    const oddFretInlay = Math.floor(numOfStrings / 2)

    const toggleNoteView = (note) => {
        console.log(note)
        if (selectedNotes.includes(note)) {
            setSelectedNotes(selectedNotes.filter((ele) => ele != note))
        } else (
            setSelectedNotes([...selectedNotes, note])
        )
    }

    return (
        <div className={styles.frets}>
            {
                stringNoteLayout.map((note, i) =>
                    i % 2 === 0 && Number(stringNum) === oddFretInlay ?
                        <div className={styles.individualNotesOddFret}>
                             <div onClick={() => toggleNoteView(note)} className={styles.individualNotes}>{selectedNotes.includes(note) && note}</div>
                            <div className={styles.oddFretInlay}>*</div>
                        </div> :
                        <div onClick={() => toggleNoteView(note)} className={styles.individualNotes}>{selectedNotes.includes(note) && note}</div>
                )
            }
        </div>
    )
}

export default Frets;