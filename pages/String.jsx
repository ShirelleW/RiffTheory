import React from 'react'
import { notes } from './utils'
import styles from '../styles/Styles.module.css'

const String = ({ stringSet, numOfFrets, currentString }) => {



  // console.log(openNote)

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
      {
        stringNoteLayout.map((note) =>
          <p>{note}</p>
        )
      }
    </div>
    
  )
}

export default String