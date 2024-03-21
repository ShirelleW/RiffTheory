import React from 'react'
import { useState } from 'react';
import { SelectedNotesContext } from '../Context/SelectedNotesContext';
import StringOpenTuning from '../src/StringOpenTuning.jsx'
import StringFretModal from '../src/StringFretModal';
import { Button, Typography } from '@mui/material';
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

    const [scaleSelected, setScaleSelected] = useState(false)
    const [scaleData, setScaleData] = useState([])


    const [noteHexes] = useState(['#57C4E5', '#C8F0D8', '#ffff00', '#F97068', '#DC493A', '#F77F00', '#FCBF49', '#EAE2B7', '#2C6E49', '#59FFA0', '#DB222A', '#C47AC0'])

    const resetFretboard = () => {
        setSelectedNotes([])
    }

    return (
        <SelectedNotesContext.Provider value={{
            selectedNotes, setSelectedNotes, modeNotes, numOfFrets, setNumOfStrings, setStringSet, setNumOfFrets, setKeyChange, setScaleType, setModeNotes, setScaleSelected, setScaleData
        }}>
            <div className={styles.mainContainer}>
                <StringFretModal
                    numOfStrings={numOfStrings}
                    numOfFrets={numOfFrets}
                    scaleType={scaleType}
                />
                <ScaleModal
                    scaleSelected={scaleSelected}
                    scaleData={scaleData}
                    keyChange={keyChange}
                    scaleType={scaleType}
                />
                {scaleSelected &&
                    <Typography variant="h5" component="h2">
                         { scaleData[0].name } 
                    </Typography>
                }
                <div className={styles.fretboardHolder}>

                    <div className={styles.fretboard}>
                        {
                            Object.entries(stringSet)?.map((stringNotePairs) =>

                                <div className={styles.stringMapping} key={stringNotePairs[0]}>

                                    <p id={styles.openNotePlayable}>{modeNotes.includes(stringNotePairs[1]) ? 'O' : 'X'}</p>

                                    <StringOpenTuning
                                        stringNotePairs={stringNotePairs}
                                        modeNotes={modeNotes}
                                        noteHexes={noteHexes}
                                        stringSet={stringSet}
                                    />

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