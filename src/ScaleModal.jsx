import React, { useState, useContext } from 'react'
import { Button, Modal, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios';
import ScaleSelectorController from './ScaleSelectorController'
import { SelectedNotesContext } from '../Context/SelectedNotesContext';
import PropTypes from 'prop-types'
import styles from '../styles/Styles.module.css'

const ScaleModal = ({ scaleType, keyChange }) => {

    const [scaleData, setScaleData] = useState([])
    const [buttonClick, setButtonClicked] = useState(false)
    const [scaleSelected, setScaleSelected] = useState(false)
    const [error, setError] = useState(false)

    const { setModeNotes } = useContext(SelectedNotesContext)
    const handleOpen = () => {
        setButtonClicked(true)
    }

    const handleClose = () => {
        setButtonClicked(false)
    }

    const scaleSearch = async () => {
        try {
            if (scaleType === "Search By Key") {
                const response = await axios.get(`http://localhost:3002/api/scales/tonic/${keyChange}`)
                setScaleData(response.data.scales.sort())
            } else {
                const response = await axios.get(`http://localhost:3002/api/scales/tonicandname/${keyChange}/${scaleType}`)
                setScaleData(response.data.scales.sort())
            }

        } catch {
            setError(true)
        }

    }

    const scaleSearchByKey = async (name) => {
        name = name.replace("#", "%23")

        try {
            const response = await axios.get(`http://localhost:3002/api/scales/name/${name}`)
            setScaleData([response.data.scales])
            setModeNotes(response.data.scales.notesinscale.split(','))
        } catch {
            setError(true)
        }
    }

    const buttonClicked = () => {
        setScaleSelected(true)
    }

    const resetSelectedScale = () => {
        setScaleSelected(false)
    }
    return (
        <div className={styles.modalController}>
            <Button onClick={handleOpen}>Pick Your Scale</Button>
            {
                buttonClick
                && <Modal
                    className={styles.stringfretmodal}
                    open={open}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box className={styles.scalesBox}>
                        <div className={styles.scalesSearchContainer}>
                            <CloseIcon id={styles.modalExit} onClick={handleClose}></CloseIcon>
                            <ScaleSelectorController />
                            <Button onClick={() => { scaleSearch(); resetSelectedScale()}} variant="contained">Search</Button>
                        </div>
                        <div className={styles.searchResults}>
                            {
                                scaleData.map((scale) =>
                                    <Button 
                                    style={{ backgroundColor: scaleSelected && 'rgb(148, 214, 148)' }} 
                                    id={styles.searchResultsButtons} 
                                    key={scale} type='button' 
                                    variant="outlined"
                                    onClick={() => { scaleSearchByKey(scale.name); buttonClicked() }}>
                                            {scale.name}
                                    </Button>
                                )
                            }
                        </div>
                    </Box>
                </Modal>
            }

        </div>
    )
}

export default ScaleModal

ScaleModal.propTypes = {
    scaleType: PropTypes.string,
    keyChange: PropTypes.string
}