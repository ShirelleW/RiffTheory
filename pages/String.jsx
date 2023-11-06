import React from 'react'
import Frets from './Frets'


const String = ( { numOfStrings, numOfFrets } ) => {
  return (
    <div className="String">
       <div className="Frets">
            <Frets />
       </div>
    </div>
  )
}

export default String