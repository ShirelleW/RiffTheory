import React from 'react'
import { useState } from 'react';
import { SelectedNotesContext } from '../Context/SelectedNotesContext';
import StringOpenTuning from '../src/StringOpenTuning.jsx'
import StringFretModal from '../src/StringFretModal';
import { Button, Typography, Switch } from '@mui/material';
import Rotate90DegreesCwTwoToneIcon from '@mui/icons-material/Rotate90DegreesCwTwoTone';
import Rotate90DegreesCcwIcon from '@mui/icons-material/Rotate90DegreesCcw';
import ScaleModal from '../src/ScaleModal';
import String from '../src/String';
import styles from '../styles/Styles.module.css'

const Controls = () => {

    const [selectedNotes, setSelectedNotes] = useState([])
    const [modeNotes, setModeNotes] = useState(["C", "D", "E", "F", "G", "A", "B"])
    const [keyChange, setKeyChange] = useState("C")
    const [scaleType, setScaleType] = useState("Major Scale")

    const [intervalMode, setIntevalMode] = useState(false)
    const [scaleIntervals, setScaleIntervals] = useState(["P1", "M2", "M3", "P4", "P5", "M6", "M7"])

    const [stringSet, setStringSet] = useState({
        1: "E", 2: "B", 3: "G", 4: "D", 5: "A", 6: "E"
    })

    const [numOfStrings, setNumOfStrings] = useState(6)
    const [numOfFrets, setNumOfFrets] = useState(12);

    const [scaleSelected, setScaleSelected] = useState(false)
    const [scaleData, setScaleData] = useState([])

    const [rotation, setRotation] = useState(false)

    const [noteHexes] = useState(['#57C4E5', '#C8F0D8', '#ffff00', '#F97068', '#DC493A', '#F77F00', '#FCBF49', '#EAE2B7', '#2C6E49', '#59FFA0', '#DB222A', '#C47AC0'])

    const resetFretboard = () => {
        setSelectedNotes([])
    }

    const handleIntervalMode = () => {
        setIntevalMode((prev) => !prev)
    }

    const fretboardRotStyle = {
        marginTop: rotation && `${numOfFrets * 2.5}vh`
    }

    return (
        <SelectedNotesContext.Provider value={{
            selectedNotes, setSelectedNotes, modeNotes, numOfFrets,
            setNumOfStrings, setStringSet, setNumOfFrets, setKeyChange,
            setScaleType, setModeNotes, setScaleSelected, setScaleData,
            setScaleIntervals, rotation
        }}>
            <div className={rotation ? styles.mainContainerRotate : styles.mainContainer}>
                <div className={rotation ? styles.infoContainerRotate : styles.infoContainer}>
                    <div className={styles.info}>
                        <div className={styles.Controls}>
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
                            <div id={styles.intervalSwitch}>
                                <Typography id={styles.intervalSwitch} variant="h6" component="h6">3. DECIDE NOTE OR INTERVAL NOTATION</Typography>
                                <Switch checked={intervalMode} color="warning" onChange={handleIntervalMode}></Switch>
                            </div>

                            {
                                rotation ?
                                    <div id={styles.rotationbtn}>
                                        <Typography id={styles.rotationbtn} variant="h6" component="h6">4. DECIDE LAYOUT</Typography>
                                        <Rotate90DegreesCcwIcon onClick={() => setRotation(false)} />
                                    </div>
                                    : <div id={styles.rotationbtn}>
                                        <Typography id={styles.rotationbtn} variant="h6" component="h6">4. DECIDE LAYOUT</Typography>
                                        <Rotate90DegreesCwTwoToneIcon onClick={() => setRotation(true)} />
                                    </div>
                            }

                        </div>

                        <div className={styles.scaleTitle}>
                            {
                                scaleData.length === 0 &&
                                <Typography variant="h5" component="h2">
                                    C Major Scale
                                </Typography>
                            }
                            {scaleSelected &&
                                <Typography variant="h5" component="h2">
                                    {scaleData[0].name}
                                </Typography>
                            }
                        </div>
                        {
                            rotation && <Button id={styles.resetFretboardBtn} onClick={resetFretboard}>
                                Reset Selected Notes
                            </Button>
                        }

                    </div>
                </div>

                <div className={rotation ? styles.fretboardHolderRotate : styles.fretboardHolder}>
                    <div className={rotation ? styles.fretboardRotate : styles.fretboard}
                        style={fretboardRotStyle}>
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
                                            scaleIntervals={scaleIntervals}
                                            intervalMode={intervalMode}
                                        />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                {
                    !rotation && <Button id={styles.resetFretboardBtn} onClick={resetFretboard}>
                        Reset Selected Notes
                    </Button>
                }
            </div>
        </SelectedNotesContext.Provider >
    )
}
export default Controls