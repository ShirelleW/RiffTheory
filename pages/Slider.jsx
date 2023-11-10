import React, { useContext, useState } from 'react'
import styles from '../styles/Styles.module.css'
import Draggable from 'react-draggable'
import { SelectedNotesContext } from './Context/SelectedNotesContext'

const Slider = ({ sliderFretRange, numOfStrings }) => {

    const [tutorialSliderView, setTutorialSliderView] = useState(0)

    const { setTutorialViewed } = useContext(SelectedNotesContext)

    const handleDrag = () => {
        setTutorialSliderView(tutorialSliderView + 1)
        
        if(tutorialSliderView === 0){
            setTutorialViewed(true)
        }
    }

    return (
        <Draggable bounds='parent' onStart={handleDrag}>
                <div className={styles.slider} style={{ width: (3.15 * sliderFretRange) + 'vw', height: (7 * numOfStrings) + 'vh' }}>
                    Drag Me!
                </div>
        </Draggable>
    )
}

export default Slider