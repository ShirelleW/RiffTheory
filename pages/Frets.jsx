import React, { useContext } from 'react'
import styles from '../styles/Styles.module.css'
import { SelectedNotesContext } from './Context/SelectedNotesContext'

export const Frets = ({ stringNum, numOfStrings, stringNoteLayout }) => {

    // button that shows all notes

    const { selectedNotes, setSelectedNotes, noteHexes } = useContext(SelectedNotesContext)
    const oddFretInlay = Math.floor(numOfStrings / 2)

    const toggleNoteView = (note) => {
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
                            <div onClick={() => toggleNoteView(note)} className={styles.individualNotes}>
                                <p style={{ backgroundColor:noteHexes[selectedNotes.indexOf(note)], 'opacity': 0.6  }} id={selectedNotes.includes(note) && styles.noteToggle}>{selectedNotes.includes(note) && note}</p>
                            </div>
                            <div className={styles.oddFretInlay}> </div>
                        </div> :
                        <div onClick={() => toggleNoteView(note)} className={styles.individualNotes}>
                            <p style={{ backgroundColor:noteHexes[selectedNotes.indexOf(note)], 'opacity': 0.6 }} id={selectedNotes.includes(note) && styles.noteToggle}>{selectedNotes.includes(note) && note}</p>
                        </div>
                )
            }
        </div>
    )
}

export default Frets;