import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { notes, notesSharp } from '../Context/utils';
import { chordTypes } from '../Context/utils';
import { SelectedNotesContext } from '../Context/SelectedNotesContext';
import String from '../src/String';
import styles from '../styles/Styles.module.css'

const Controls = () => {

    const [scaleData, setScaleData] = useState([])
    const [error, setError] = useState(false)
    const [selectedNotes, setSelectedNotes] = useState([])
    const [modeNotes, setModeNotes] = useState(["C", "D", "E", "F", "G", "A", "B", "C"])
    const [keyChange, setKeyChange] = useState("C")
    const [chordType, setChordType] = useState("Major Scale")

    const [numOfStrings, setNumOfStrings] = useState(6)
    const [numOfFrets, setNumOfFrets] = useState(12);

    const [stringSet, setStringSet] = useState({
        1: "E", 2: "B", 3: "G", 4: "D", 5: "A", 6: "E"
    })


    const [noteHexes] = useState(['#57C4E5', '#C8F0D8', '#ffff00', '#F97068', '#DC493A', '#F77F00', '#FCBF49', '#EAE2B7', '#2C6E49', '#59FFA0', '#DB222A', '#C47AC0'])

    const handleStrings = (e) => {
        if (Number(e.target.value) < 6) {
            const originalSet = { 1: "E", 2: "B", 3: "G", 4: "D", 5: "A", 6: "E" }

            let userSet = Number(e.target.value) === 0 ? originalSet :
                Object.fromEntries(Object.entries(originalSet).slice(-Number(e.target.value)));
            setStringSet(userSet)
            setNumOfStrings(Object.keys(userSet).length)
        } else {
            let userSet = { 1: "E", 2: "B", 3: "G", 4: "D", 5: "A", 6: "E" }
            let secondarySet = {
                7: "Gb", 8: "B", 9: "E", 10: "A", 11: "D", 12: "G"
            }

            userSet = Object.assign({}, userSet, Object.fromEntries(Object.entries(secondarySet).slice(0, Number(e.target.value) - 6)))
            setStringSet(userSet)
            setNumOfStrings(Object.keys(userSet).length)
        }
    }

    const handleTunings = (e, stringNum) => {
        // making a copy of stringSet without modifying stringSet
        let userTunings = Object.fromEntries(Object.entries(stringSet))

        const newNote = e.target.value
        userTunings[stringNum] = newNote

        setStringSet(userTunings)

    }

    const handleKeyChange = (e) => {
        setKeyChange(e.target.value)
        // setModeNotes(chordTypes[chordType](e.target.value))
    }

    const handleChordTypeChange = (e) => {
        setChordType(e.target.value)
        // setModeNotes(chordTypes[e.target.value](keyChange))
    }

    const resetFretboard = () => {
        setSelectedNotes([])
    }

    const scaleSearch = async () => {
        try {
            if (chordType === "Search By Key") {
                const response = await axios.get(`http://localhost:3002/api/scales/tonic/${keyChange}`)
                setScaleData(response.data.scales)
            } else {
                const response = await axios.get(`http://localhost:3002/api/scales/tonicandname/${keyChange}/${chordType}`)
                setScaleData(response.data.scales)
            }

        } catch {
            setError(true)
        }

    }

    const scaleSearchByKey = async (name) => {
        name = name.replace("#", "%23")

        try {
            console.log(name)
            const response = await axios.get(`http://localhost:3002/api/scales/name/${name}`)
            setScaleData([response.data.scales])
            setModeNotes(response.data.scales.notesinscale.split(','))
            console.log(modeNotes)
        } catch {
            setError(true)
        }
    }

    return (
        <SelectedNotesContext.Provider value={{
            selectedNotes, setSelectedNotes, modeNotes, numOfFrets
        }}>
            <div className={styles.mainContainer}>
                {/* EDIT TO TAKE IN WHOLE NUMBER */}
                <form className={styles.controls} action="">
                    <label htmlFor="numOfStrings">Number of Strings (6-12): </label>
                    <input type="text" onChange={handleStrings} />

                    <label htmlFor="numOfFrets">Number of Frets (12-24): </label>
                    <input type="text" onChange={e => setNumOfFrets(e.target.value <= 24 && e.target.value >= 12 ? e.target.value : 12)} />

                    <select className={styles.keySelector} onChange={(e) => handleKeyChange(e)}>
                        {
                            notes?.map((note) => <option key={note} value={note}>{note}</option>)
                        }
                    </select>
                    <select className={styles.chordTypeSelector} onChange={(e) => handleChordTypeChange(e)}>
                        {
                            Object.entries(chordTypes)?.map((type) => <option key={type} style={{ backgroundColor: type[1] === null && 'silver' }} disabled={type[1] === null && true} value={type[0]}>{type[0]}</option>)
                        }
                    </select>
                    <button type='button' onClick={scaleSearch}>Search</button>
                    <button type='button' onClick={resetFretboard}>
                        Reset Selected Notes
                    </button>
                </form>

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
                                                ?   noteHexes[notesSharp.indexOf(stringNotePairs[1])]
                                                :   noteHexes[notes.indexOf(stringNotePairs[1])] : 'grey'
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
                    </div>
                    <div>
                        {
                            scaleData.map((scale) => <p key={scale.name}>
                                <button type='button' onClick={() => scaleSearchByKey(scale.name)}>{scale.name}</button>
                            </p>)
                        }
                    </div>
                </div>


            </div>
        </SelectedNotesContext.Provider >
    )
}
export default Controls