import React, { useContext } from 'react'
import { notes } from './utils'
import styles from '../styles/Styles.module.css'
import { Frets } from './Frets'
import { notesToShow } from './Frets'

const String = ({ stringNum, numOfStrings, numOfFrets, currentString }) => {

  let openNote = currentString[1]

  const fretNote = (currentNote) => {
    const nextNote = notes[notes.indexOf(currentNote) + 1] || "C"
    return nextNote
  }
  const filler = 'abcdefghijklmnopqrstuvwxyz'.slice(0, numOfFrets)

  const stringLayout = () => {
    let noteLayout = [...filler]
    let tempArr = []
    noteLayout = noteLayout.map((ele) => {
      const prevNote = tempArr[noteLayout.indexOf(ele) - 1]
      const note = noteLayout.indexOf(ele) === 0 ? fretNote(openNote) : fretNote(prevNote)
      tempArr.push(note)
    })
    return tempArr
  }

  const stringNoteLayout = stringLayout()

  return (
    <div id={styles.individualNotes}>
      <Frets
        numOfStrings={numOfStrings}
        stringNoteLayout={stringNoteLayout}
        numOfFrets={numOfFrets}
        stringNum={stringNum}
      />
    </div>

  )
}

export default String