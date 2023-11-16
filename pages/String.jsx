import React from 'react'
import { notes } from './utils'
import { Frets } from './Frets'
import PropTypes from 'prop-types';

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
      <Frets
        numOfStrings={numOfStrings}
        stringNoteLayout={stringNoteLayout}
        numOfFrets={numOfFrets}
        stringNum={stringNum}
      />
  )
}

export default String

String.propTypes = {
  stringNum: PropTypes.String,
  numOfStrings: PropTypes.Number,
  numOfFrets: PropTypes.Number, 
  currentString: PropTypes.Object,
};