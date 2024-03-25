import React, { useState, useContext } from 'react'
import { Button, Modal, Box, Pagination } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios';
import ScaleSelectorController from './ScaleSelectorController'
import { SelectedNotesContext } from '../Context/SelectedNotesContext';
import PropTypes from 'prop-types'
import styles from '../styles/Styles.module.css'

const ScaleModal = ({ scaleType, keyChange, scaleData, scaleSelected }) => {

    const [buttonClick, setButtonClicked] = useState(false)
    // const [error, setError] = useState(false)

    const [searchResultData, setSearchResultData] = useState([])
    const [page, setPage] = useState(1)

    const { setModeNotes, setScaleSelected, setScaleData, setScaleIntervals } = useContext(SelectedNotesContext)
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
                setSearchResultData(response.data.scales.sort().slice(0, 10))
            } else {
                const response = await axios.get(`http://localhost:3002/api/scales/tonicandname/${keyChange}/${scaleType}`)
                if (response.data.message === "No scales to return!"){
                    setSearchResultData([{error: "NO SCALES TO VIEW, TRY ANOTHER SEARCH SELECTION"}])
                } else {
                    setScaleData(response.data.scales.sort())
                    setSearchResultData(response.data.scales.sort().slice(0, 10))
                }
            }
        } catch(error) {
            // setError(true)
            console.log(error)
        }
    }

    const scaleSearchByKey = async (name) => {
        name = name.replace("#", "%23")

        try {
            const response = await axios.get(`http://localhost:3002/api/scales/name/${name}`)
            setScaleData([response.data.scales])
            setModeNotes(response.data.scales.notesinscale.split(','))
            setScaleIntervals(response.data.scales.scaleintervalformula.split(','))
        } catch(error) {
            // setError(true)
            console.log(error)
        }
    }

    const buttonClicked = () => {
        setScaleSelected(true)
    }

    const resetSelectedScale = () => {
        setScaleSelected(false)
    }

    const fetchSearchResults = (page) => {
        const start = (page * 10) - 9
        const end = (page * 10) + 1

        setSearchResultData(scaleData.slice(start, end))
    }
    const handleChange = (event, value) => {
        setPage(value)
        fetchSearchResults(value)
    }


    return (
        <div className={styles.modalController}>
            <Button onClick={handleOpen} id={styles.pickTitle}>2. Pick Your Scale</Button>
            {
                buttonClick
                && <Modal
                    className={styles.stringfretmodal}
                    open={true}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box className={styles.scalesBox}>
                        <div className={styles.scalesSearchContainer}>
                            <CloseIcon id={styles.modalExit} onClick={handleClose}></CloseIcon>
                            <ScaleSelectorController />
                            <Button onClick={() => { scaleSearch(); resetSelectedScale() }} variant="contained">Search</Button>
                        </div>
                        <div className={styles.searchResults}>
                            <div className={styles.searchResultsContainer}>
                                {
                                    searchResultData.map((scale) =>
                                        <Button
                                            style={
                                                { backgroundColor: scaleSelected 
                                                    && scale.name === scaleData[0].name 
                                                    ? 'rgb(148, 214, 148)' : scale.error && 'red'}}
                                            id={styles.searchResultsButtons}
                                            key={scale.name} type='button'
                                            variant="outlined"
                                            onClick={() => { 
                                                scale.error ? null :
                                                scaleSearchByKey(scale.name); buttonClicked() 
                                            }}>
                                            {scale.name ? scale.name : scale.error}
                                        </Button>
                                    )
                                }
                            </div>
                            <div>
                                {
                                    scaleData.length > 10 && <Pagination count={Math.ceil(scaleData.length / 10)} page={page} onChange={handleChange} />
                                }
                            </div>
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
    keyChange: PropTypes.string,
    scaleData: PropTypes.array,
    scaleSelected: PropTypes.bool
}