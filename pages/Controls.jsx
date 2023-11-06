import React from 'react'
import { useState } from 'react';
import { notes } from './utils';
import String from './String';

const Controls = () => {

    const [numOfFrets, setNumOfFrets] = useState(12);
    const [numOfStrings, setNumOfStrings] = useState(6);

    const [stringSet, setStringSet] = useState(["E", "A", "D", "G", "B", "F"])



    const handleStrings = (e) => {
        setNumOfStrings(e.target.value <= 12 && e.target.value > 0 ? e.target.value : 6)
        if (e.target.value < 6) {
            const originalSet = ["E", "A", "D", "G", "B", "F"]
            let userSet = originalSet.slice(0, e.target.value)
            setStringSet(userSet)
        } else {
            // modify for > 10
            let userSet = ["E", "A", "D", "G", "B", "F"]
            let secondarySet = ["Eb", "Ab", "Db", "Gb", "Bb", "C"]
            userSet.push(...secondarySet.slice(0, e.target.value - 6))
            setStringSet(userSet)
        }
    }

    const handleTunings = (e, noteIndex) => {
        let userTunings = stringSet.map((note) => (note))

        const newNote = e.target.value
        userTunings[noteIndex] = newNote

        setStringSet(userTunings)
        console.log(stringSet)
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
                        stringSet.map((note) =>
                            <div className='openStrings'>
                                <select value={note} onChange={(e) => handleTunings(e, stringSet.indexOf(note))}>
                                    {
                                        notes.map((note) => <option value={note} >{note}</option>)
                                    }
                                </select>
                            </div>

                        )
                    }
                </form>
            </div>
            {stringSet}
            {/* <String
                numOfStrings={numOfStrings}
                numOfFrets={numOfFrets}
            /> */}
        </div>
    )
}

export default Controls