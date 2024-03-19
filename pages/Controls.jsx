import React from 'react'
import { useState } from 'react';
import { notes, notesSharp } from '../Context/utils';
import { SelectedNotesContext } from '../Context/SelectedNotesContext';
import StringFretModal from '../src/StringFretModal';
import { Button } from '@mui/material';
import ScaleModal from '../src/ScaleModal';
import String from '../src/String';
import styles from '../styles/Styles.module.css'

const Controls = () => {

    const [selectedNotes, setSelectedNotes] = useState([])
    const [modeNotes, setModeNotes] = useState(["C", "D", "E", "F", "G", "A", "B", "C"])
    const [keyChange, setKeyChange] = useState("C")
    const [scaleType, setScaleType] = useState("Major Scale")

    const [stringSet, setStringSet] = useState({
        1: "E", 2: "B", 3: "G", 4: "D", 5: "A", 6: "E"
    })

    const [numOfStrings, setNumOfStrings] = useState(6)
    const [numOfFrets, setNumOfFrets] = useState(12);




    const [noteHexes] = useState(['#57C4E5', '#C8F0D8', '#ffff00', '#F97068', '#DC493A', '#F77F00', '#FCBF49', '#EAE2B7', '#2C6E49', '#59FFA0', '#DB222A', '#C47AC0'])



    const handleTunings = (e, stringNum) => {
        // making a copy of stringSet without modifying stringSet
        let userTunings = Object.fromEntries(Object.entries(stringSet))

        const newNote = e.target.value
        userTunings[stringNum] = newNote

        setStringSet(userTunings)

    }

    const resetFretboard = () => {
        setSelectedNotes([])
    }

    return (
        <SelectedNotesContext.Provider value={{
            selectedNotes, setSelectedNotes, modeNotes, numOfFrets, setNumOfStrings, setStringSet, setNumOfFrets, setKeyChange, setScaleType, setModeNotes
        }}>
            <div className={styles.mainContainer}>
                <StringFretModal
                    numOfStrings={numOfStrings}
                    numOfFrets={numOfFrets}
                    scaleType={scaleType}
                />
                <ScaleModal
                    keyChange={keyChange}
                    scaleType={scaleType}
                />

                <div className={styles.fretboardHolder}>

                    <div className={styles.fretboard}>
                        {
                            Object.entries(stringSet)?.map((stringNotePairs) =>

                                <div className={styles.stringMapping} key={stringNotePairs[0]}>

                                    <p id={styles.openNotePlayable}>{modeNotes.includes(stringNotePairs[1]) ? 'O' : 'X'}</p>

                                    <form>
                                        <select className={styles.openNoteSelector}
                                            style={{
                                                backgroundColor: modeNotes.includes(stringNotePairs[1])
                                                    ? modeNotes.join('').includes("#")
                                                        ? noteHexes[notesSharp.indexOf(stringNotePairs[1])]
                                                        : noteHexes[notes.indexOf(stringNotePairs[1])] : 'grey'
                                            }}
                                            value={stringNotePairs[1]}
                                            onChange={(e) => handleTunings(e, stringNotePairs[0])}
                                        >
                                            {
                                                modeNotes.join('').includes("#")
                                                    ? notesSharp.map((note) => <option style={{ backgroundColor: 'white' }} key={note} value={note}>{note}</option>)
                                                    : notes.map((note) => <option style={{ backgroundColor: 'white' }} key={note} value={note}>{note}</option>)
                                            }
                                        </select>
                                    </form>
                                    <div className={styles.fretboard_grid}>
                                        <hr className={styles.hr}
                                            style={{ height: parseInt(stringNotePairs[0]) * 0.44 + 'px' }} />
                                        <String
                                            numOfStrings={numOfStrings}
                                            numOfFrets={numOfFrets}
                                            stringNum={stringNotePairs[0]}
                                            openNote={stringNotePairs[1]}
                                            noteHexes={noteHexes}
                                            scaleNotes={modeNotes}
                                        />
                                    </div>
                                </div>
                            )
                        }
                        <Button type='button' onClick={resetFretboard}>
                            Reset Selected Notes
                        </Button>
                    </div>
                </div>


            </div>
        </SelectedNotesContext.Provider >
    )
}
export default Controls