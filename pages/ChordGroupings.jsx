import React, { useContext, useState } from 'react'
import { SelectedNotesContext } from '../Context/SelectedNotesContext'

const ChordGroupings = () => {

const { modeNotes, numOfFrets } = useContext(SelectedNotesContext)

  return (
    <div>ChordGroupings</div>
  )
}

export default ChordGroupings