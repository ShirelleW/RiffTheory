import React, { useContext, useState } from 'react'
import styles from '../styles/Styles.module.css'
import Highlighter from './Highlighter'
import { SelectedNotesContext } from './Context/SelectedNotesContext'
import randomColor from 'randomcolor'

export const Frets = ({ stringNum, numOfStrings, stringNoteLayout }) => {

    // button that shows all notes

    const { selectedNotes, setSelectedNotes, noteHexes, modeNotes } = useContext(SelectedNotesContext)

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
            <Highlighter stringNoteLayout={stringNoteLayout} />
            {
                stringNoteLayout.map((note, i) =>
                    // Selected Theory Display
                    modeNotes.includes(note) ?

                            <div className={styles.individualNotes}>
                                <p style={{
                                    backgroundColor: randomColor(),
                                    'opacity': 0.6
                                }} id={styles.noteToggle}>{note}</p>
                        </div>
                        :
                        // Selected Notes Display
                        (
                            i % 2 === 0 && Number(stringNum) === oddFretInlay ?
                                <div className={styles.individualNotesOddFret}>
                                    <div onClick={() => toggleNoteView(note)} className={styles.individualNotes}>
                                        <p style={{ backgroundColor: noteHexes[selectedNotes.indexOf(note)], 'opacity': 0.6 }} id={selectedNotes.includes(note) && styles.noteToggle}>{selectedNotes.includes(note) && note}</p>
                                    </div>
                                    <div className={styles.oddFretInlay}> </div>
                                </div> :
                                <div onClick={() => toggleNoteView(note)} className={styles.individualNotes}>
                                    <p style={{ backgroundColor: noteHexes[selectedNotes.indexOf(note)], 'opacity': 0.6 }} id={selectedNotes.includes(note) && styles.noteToggle}>{selectedNotes.includes(note) && note}</p>
                                </div>
                        )
                )
            }
        </div>
    )
}

export default Frets;