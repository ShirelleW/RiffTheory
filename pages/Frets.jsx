import React, { useContext } from 'react'
import PropTypes from 'prop-types';
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

    // line show through div
    // mode note to show on odd fret inlay ?

    return (
        <div className={styles.frets}>
            {
                stringNoteLayout.map((note, i) =>
                    modeNotes.includes(note) ? (
                        fretInlayFret.includes(i) && Number(stringNum) === fretInlayString ?
                            (
                                <div className={styles.individualNotes}>
                                    <p style={{
                                        backgroundColor: noteHexes[notes.indexOf(note)],
                                        'opacity': 0.6
                                    }} id={styles.noteToggle}>{note}</p>
                                    <div className={styles.fretInlay}></div>
                                </div>
                            ) :
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
                        fretInlayFret.includes(i) && Number(stringNum) === fretInlayString ?
                            (
                                <div onClick={() => toggleNoteView(note)} className={styles.individualNotes}>
                                    <p style={{ backgroundColor: noteHexes[notes.indexOf(note)], 'opacity': 0.6 }} id={selectedNotes.includes(note) && styles.noteToggle}>{selectedNotes.includes(note) && note}</p>
                                    <div className={styles.fretInlay}></div>
                                </div>
                            ) :
                            <div onClick={() => toggleNoteView(note)} className={styles.individualNotes}>
                                <p style={{ backgroundColor: noteHexes[notes.indexOf(note)], 'opacity': 0.6 }} id={selectedNotes.includes(note) && styles.noteToggle}>{selectedNotes.includes(note) && note}</p>
                            </div>
                )
            }
        </div>
    )
}

export default Frets;

Frets.propTypes = {
    stringNum: PropTypes.string,
    numOfStrings: PropTypes.number,
    stringNoteLayout: PropTypes.array,
  };