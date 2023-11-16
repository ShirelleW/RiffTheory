import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import styles from '../styles/Styles.module.css'
import Draggable from 'react-draggable'
import { SelectedNotesContext } from './Context/SelectedNotesContext'

const Slider = ({ sliderFretRange, numOfStrings }) => {

    const { setTutorialViewed, setTutorialSliderView, tutorialSliderView} = useContext(SelectedNotesContext)

    const handleDrag = () => {
        setTutorialSliderView(tutorialSliderView + 1)
        
        if(tutorialSliderView === 0){
            setTutorialViewed(true)
        }
    }

    return (
        <Draggable bounds='parent' onStart={handleDrag}>
                <div className={styles.slider} style={{ width: (3.15 * sliderFretRange) + 'vw', height: (7 * numOfStrings) + 'vh' }}>
                    Focus Visibility
                </div>
        </Draggable>
    )
}

export default Slider

Slider.propTypes = {
    sliderFretRange: PropTypes.number,
    numOfStrings: PropTypes.number,
}