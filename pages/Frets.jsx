import React, { useContext, useState } from 'react'
import styles from '../styles/Styles.module.css'
import { SelectedNotesContext } from './Context/SelectedNotesContext'
import { notes } from './utils'

// Parent String
export const Frets = ({ stringNum, numOfStrings, stringNoteLayout }) => {

    const { selectedNotes, setSelectedNotes, noteHexes, modeNotes } = useContext(SelectedNotesContext)


    const fretInlayString = Math.floor(numOfStrings / 2)
    const fretInlayFret = [2, 4, 6, 8, 11, 14, 16, 18, 20, 23]

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
                // Selected Notes Display
                (
                    fretInlayFret.includes(i) && Number(stringNum) === fretInlayString ?
                        <div className={styles.individualNotesOddFret}>
                            <div onClick={() => toggleNoteView(note)} className={styles.individualNotes}>
                                <p style={{ backgroundColor: noteHexes[notes.indexOf(note)], 'opacity': 0.6 }} id={selectedNotes.includes(note) && styles.noteToggle}>{selectedNotes.includes(note) && note}</p>
                            </div>
                            <div className={styles.fretInlay}> </div>
                        </div> :
                        (
                            modeNotes.includes(note) ? (
                                (
                                    <div className={styles.individualNotes}>
                                        <p style={{
                                            backgroundColor: noteHexes[notes.indexOf(note)],
                                            'opacity': 0.6
                                        }} id={styles.noteToggle}>{note}</p>
                                    </div>
                                )
                            )
                                :
                                <div onClick={() => toggleNoteView(note)} className={styles.individualNotes}>
                                    <p style={{ backgroundColor: noteHexes[notes.indexOf(note)], 'opacity': 0.6 }} id={selectedNotes.includes(note) && styles.noteToggle}>{selectedNotes.includes(note) && note}</p>
                                </div>
                        )
                )
                )
            }
        </div>
    )
}

export default Frets;