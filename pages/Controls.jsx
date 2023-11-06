import React from 'react'
import { useState } from 'react';
import { notes } from './utils';
import String from './String';

const Controls = () => {

    const [numOfStrings, setNumOfStrings] = useState(6)
    const [numOfFrets, setNumOfFrets] = useState(12);

    const [stringSet, setStringSet] = useState({
        1: "E", 2: "A", 3: "D", 4: "G", 5: "B", 6: "F"
    })

    const handleStrings = (e) => {
        console.log(e.target.value)
        setNumOfStrings((e.target.value <= 12 && e.target.value > 0) ? e.target.value : 6)
        if (e.target.value < 6) {
            const originalSet = { 1: "E", 2: "A", 3: "D", 4: "G", 5: "B", 6: "F" }
         
            let userSet = Object.fromEntries(Object.entries(originalSet).slice(0, e.target.value).map(entry => entry));
            setStringSet(userSet)
        } else {
            // modify for > 10
            let userSet = { 1: "E", 2: "A", 3: "D", 4: "G", 5: "B", 6: "F" }
            let secondarySet = {
                7: "Eb", 8: "Ab", 9: "Db", 10: "Gb", 11: "Bb", 12: "C"}
 
            userSet = Object.assign(userSet, Object.fromEntries(Object.entries(secondarySet).slice(0, e.target.value-6).map(entry => entry)))
            setStringSet(userSet)
        }
    }

    const handleTunings = (e, stringNum) => {
        // making a copy of stringSet without modifying stringSet
        let userTunings = Object.fromEntries(Object.entries(stringSet).map(entry => entry))

        const newNote = e.target.value
        userTunings[stringNum] = newNote

        setStringSet(userTunings)
        
    }

    return (
        <div>
            <form action="">
                <label htmlFor="numOfStrings">Number of Strings (6-12): </label>
                <input type="text" onChange={handleStrings} />
                <label htmlFor="numOfFrets">Number of Frets (12-24): </label>
                <input type="text" onChange={e => setNumOfFrets(e.target.value <= 24 && e.target.value >= 12 ? e.target.value : 12)} />
            </form>

            <div className="tuningSelector">
                <form>
                    {
                        Object.entries(stringSet).map(entry => entry).map((stringNotePairs) =>

                            <div className='openStrings'>
                                
                                <select value={stringNotePairs[1]} onChange={(e) => handleTunings(e, stringNotePairs[0])}>
                                    {
                                        notes.map((note) => <option value={note} >{note}</option>)
                                    }
                                </select>
                            </div>

                        )
                    }
                </form>
            </div>

            <String 
                numOfFrets={numOfFrets}
                stringSet={stringSet}
            /> 
        </div>
    )
}

export default Controls