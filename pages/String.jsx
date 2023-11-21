import React from 'react'
import PropTypes from 'prop-types';
import { notes } from '../Context/utils'
import { Frets } from './Frets'
import ChordGroupings from './ChordGroupings';


const String = ({ stringNum, numOfStrings, numOfFrets, openNote, openView, noteHexes }) => {


  const fretNote = (currentNote) => {
    const nextNote = notes[notes.indexOf(currentNote) === notes.length -1 ? null : notes.indexOf(currentNote) + 1] || "C"
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

  return (
    <div>
    {
      openView ? 
      <Frets
        numOfStrings={numOfStrings}
        stringNoteLayout={stringNoteLayout}
        numOfFrets={numOfFrets}
        stringNum={stringNum}
        noteHexes={noteHexes}
      /> : < ChordGroupings /> 
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
  noteHexes: PropTypes.array
};