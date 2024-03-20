import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import { notes, notesSharp } from '../Context/utils.js'
import styles from '../styles/Styles.module.css'
import { SelectedNotesContext } from '../Context/SelectedNotesContext'

const StringOpenTuning = ({stringNotePairs, modeNotes, noteHexes, stringSet }) => {

    const {setStringSet } = useContext(SelectedNotesContext)

    const handleTunings = (e, stringNum) => {stringSet
        // making a copy of stringSet without modifying stringSet
        let userTunings = Object.fromEntries(Object.entries(stringSet))

        const newNote = e.target.value
        userTunings[stringNum] = newNote

        setStringSet(userTunings)

    }

    return (
        <div>
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
        </div>
    )
}

export default StringOpenTuning

StringOpenTuning.propTypes = {
    stringNotePairs: PropTypes.array,
    modeNotes: PropTypes.array,
    noteHexes: PropTypes.array,
    stringSet: PropTypes.object
}