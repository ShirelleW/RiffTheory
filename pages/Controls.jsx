import React from 'react'
import { useState } from 'react';
import { notes, frets } from './utils';
import { chordTypes } from './utils';
import { SelectedNotesContext } from './Context/SelectedNotesContext';
import String from './String';
import styles from '../styles/Styles.module.css'
import Slider from './Slider';
var randomColor = require('randomcolor');



const Controls = () => {

    const [selectedNotes, setSelectedNotes] = useState([])
    const [modeNotes, setModeNotes] = useState(["F", "G"])
    const [keyChange, setKeyChange] = useState("C")

    const [numOfStrings, setNumOfStrings] = useState(6)
    const [numOfFrets, setNumOfFrets] = useState(12);

    const [stringSet, setStringSet] = useState({
        1: "E", 2: "A", 3: "D", 4: "G", 5: "B", 6: "F"
    })

    const [sliderFretRange, setSliderFretRange] = useState(6)
    const [tutorialViewed, setTutorialViewed] = useState(false)

    const handleStrings = (e) => {
        setNumOfStrings((Number(e.target.value) <= 12 && e.target.value > 0) ? Number(e.target.value) : 6)
        if (Number(e.target.value) < 6) {
            const originalSet = { 1: "E", 2: "A", 3: "D", 4: "G", 5: "B", 6: "F" }

            let userSet = Number(e.target.value) === 0 ? originalSet : 
                Object.fromEntries(Object.entries(originalSet).slice(0, Number(e.target.value)));
            setStringSet(userSet)
        } else {
            let userSet = { 1: "E", 2: "A", 3: "D", 4: "G", 5: "B", 6: "F" }
            let secondarySet = {
                7: "Eb", 8: "Ab", 9: "Db", 10: "Gb", 11: "Bb", 12: "C"
            }

            userSet = Object.assign(userSet, Object.fromEntries(Object.entries(secondarySet).slice(0, Number(e.target.value) - 6)))
            setStringSet(userSet)
        }
    }

    console.log(numOfStrings)
    const handleTunings = (e, stringNum) => {
        // making a copy of stringSet without modifying stringSet
        let userTunings = Object.fromEntries(Object.entries(stringSet))

        const newNote = e.target.value
        userTunings[stringNum] = newNote

        setStringSet(userTunings)

    }

    const handleKeyChange = (e) => {
        setKeyChange(e.target.value)
    }
    const handleChordTypeChange = (e) => {
        setModeNotes(chordTypes[e.target.value](keyChange))
    }

    let noteHexes = selectedNotes.map((ele) => (randomColor({ luminosity: 'bright' })))

    return (
        <SelectedNotesContext.Provider value={{
            selectedNotes, setSelectedNotes, noteHexes, modeNotes, setTutorialViewed
        }}>
            <div className={styles.mainContainer}>
                {/* EDIT TO TAKE IN WHOLE NUMBER */}
                <form action="">
                    <label htmlFor="numOfStrings">Number of Strings (6-12): </label>
                    <input type="text" onChange={handleStrings} />
                    <label htmlFor="numOfFrets">Number of Frets (12-24): </label>
                    <input type="text" onChange={e => setNumOfFrets(e.target.value <= 24 && e.target.value >= 12 ? e.target.value : 12)} />
                    <select className={styles.keySelector} onChange={(e) => handleKeyChange(e)}>
                        {
                            notes.map((note) => <option value={note} >{note}</option>)
                        }
                    </select>
                    <select className={styles.chordTypeSelector} onChange={(e) => handleChordTypeChange(e)}>
                        {
                            Object.entries(chordTypes).map((type) => <option value={type[0]}>{type[0]}</option>)
                        }
                    </select>
                    <div className={tutorialViewed && styles.sliderRangeInput} id={styles.sliderRangeNoAnim}>
                        <input type="range"
                            name="sliderRange"
                            min="0"
                            max={numOfFrets}
                            step={1}
                            onChange={(e) => setSliderFretRange(e.target.value)} />
                        <p>Drag right for wider range!</p>
                    </div>

                </form>
                <div className={styles.fretboard}>
                    {
                        Object.entries(stringSet).map((stringNotePairs) =>

                            <div className={styles.stringMapping}>
                                <form className={styles.openNotes}>
                                    <select className={styles.openNoteSelector} value={stringNotePairs[1]} onChange={(e) => handleTunings(e, stringNotePairs[0])}>
                                        {
                                            notes.map((note) => <option value={note} >{note}</option>)
                                        }
                                    </select>
                                </form>

                                <div className={styles.fretboard}>
                                    <String
                                        numOfStrings={numOfStrings}
                                        numOfFrets={numOfFrets}
                                        stringNum={stringNotePairs[0]}
                                        currentString={stringNotePairs}
                                    />
                                </div>
                            </div>
                        )
                    }
                    <Slider
                        numOfStrings={numOfStrings}
                        sliderFretRange={sliderFretRange} />
                </div>
            </div>
        </SelectedNotesContext.Provider >
    )
}

export default Controls