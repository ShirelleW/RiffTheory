import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import { notes, notesSharp } from '../Context/utils'
import { SelectedNotesContext } from '../Context/SelectedNotesContext'
import styles from '../styles/Styles.module.css'

const String = ({ stringNum, numOfStrings, numOfFrets, openNote, 
                    noteHexes, scaleNotes, scaleIntervals, intervalMode }) => {

    const fretNote = (currentNote) => {
        let nextNote;
        if (scaleNotes.join('').includes("#")) {
            nextNote = notesSharp[notes.indexOf(currentNote) === notes.length - 1 ? null : notesSharp.indexOf(currentNote) + 1] || "C"
        } else {
            nextNote = notes[notes.indexOf(currentNote) === notes.length - 1 ? null : notes.indexOf(currentNote) + 1] || "C"
        }

        return nextNote
    }

    const filler = 'abcdefghijklmnopqrstuvwxyz'.slice(0, numOfFrets)

    const stringLayout = () => {
        let noteLayout = [...filler]
        let tempArr = []

        noteLayout = noteLayout?.map((ele) => {
            const prevNote = tempArr[noteLayout.indexOf(ele) === 0 ? null : noteLayout.indexOf(ele) - 1]
            const note = noteLayout.indexOf(ele) === 0 ? fretNote(openNote) : fretNote(prevNote)
            tempArr.push(note)
        })

        return tempArr
    }


    const stringNoteLayout = stringLayout()

    const { selectedNotes, setSelectedNotes, modeNotes } = useContext(SelectedNotesContext)

    const fretInlayFret = [2, 4, 6, 8, 11, 14, 16, 18, 20, 23]

    const fretInlayString = (index) => {
        if (index % 11 === 0) {
            return [(Math.floor(numOfStrings / 2) - 1), (Math.floor(numOfStrings / 2) + 1)]
        } else {
            return [Math.floor(numOfStrings / 2)]
        }
    }


    const toggleNoteView = (note) => {
        if (selectedNotes?.includes(note)) {
            setSelectedNotes(selectedNotes?.filter((ele) => ele != note))
        } else (
            setSelectedNotes([...selectedNotes, note])
        )
    }

    const scaleIntervalControl = (note) => {
        // modeNotes gets set in searchByKEy Button function in ScaleModal
        // Since intervals were based off note order at collection, 
        // we know that interval index = mode note index

        return scaleIntervals[modeNotes.indexOf(note)]
    }

    return (
        <div className={styles.string}>
            {
                stringNoteLayout?.map((note, i) =>
                    modeNotes?.includes(note) ? (
                        fretInlayFret?.includes(i) && fretInlayString(i).includes(Number(stringNum)) ?
                            (
                                <div key={i} className={styles.individualNotes}>
                                    <p style={
                                    { backgroundColor: scaleNotes.join('').includes("#")
                                    ? noteHexes[notesSharp.indexOf(note)]
                                    : noteHexes[notes.indexOf(note)], 'opacity': 0.6 }}
                                    id={styles.noteToggle}>
                                        {intervalMode ? scaleIntervalControl(note) : note}
                                    </p>
                                    <div className={styles.fretInlay}></div>
                                </div>
                            ) :
                            (
                                <div key={i} className={styles.individualNotes}>
                                    <p style={
                                    { backgroundColor: scaleNotes.join('').includes("#")
                                    ? noteHexes[notesSharp.indexOf(note)]
                                    : noteHexes[notes.indexOf(note)], 'opacity': 0.6 }} 
                                    id={styles.noteToggle}>
                                        {intervalMode ? scaleIntervalControl(note) : note}
                                    </p>
                                </div>
                            )
                    )
                        :
                        fretInlayFret?.includes(i) && fretInlayString(i).includes(Number(stringNum)) ?
                            (
                                <div key={i} onClick={() => toggleNoteView(note)} className={styles.individualNotes}>
                                    <p style={
                                    { backgroundColor: scaleNotes.join('').includes("#")
                                    ? noteHexes[notesSharp.indexOf(note)]
                                    : noteHexes[notes.indexOf(note)], 'opacity': 0.6 }}
                                    id={selectedNotes?.includes(note) ? styles.noteToggle : undefined}>{selectedNotes?.includes(note) && note}</p>
                                    <div className={styles.fretInlay}></div>
                                </div>
                            ) :
                            <div key={i} onClick={() => toggleNoteView(note)} className={styles.individualNotes}>
                                <p style={
                                    { backgroundColor: scaleNotes.join('').includes("#")
                                    ? noteHexes[notesSharp.indexOf(note)]
                                    : noteHexes[notes.indexOf(note)], 'opacity': 0.6 }}
                                    id={selectedNotes?.includes(note) ? styles.noteToggle : undefined}>
                                    {selectedNotes?.includes(note) && note}
                                </p>
                            </div>

                )
            }
        </div>
    )
}

export default String

String.propTypes = {
    stringNum: PropTypes.string,
    numOfStrings: PropTypes.number,
    numOfFrets: PropTypes.number,
    openNote: PropTypes.string,
    openView: PropTypes.bool,
    noteHexes: PropTypes.array,
    scaleNotes: PropTypes.array
};