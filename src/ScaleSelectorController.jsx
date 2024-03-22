import React, { useContext } from 'react'
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material'
import PropTypes from 'prop-types'
import { notes, chordTypes } from '../Context/utils.js'
import { SelectedNotesContext } from '../Context/SelectedNotesContext'
import styles from '../styles/Styles.module.css'

const ScaleSelectorController = ({ keyChange, scaleType }) => {

    const { setKeyChange, setScaleType } = useContext(SelectedNotesContext)

    const handleKeyChange = (e) => {
        setKeyChange(e.target.value)
    }

    const handleScaleTypeChange = (e) => {
        setScaleType(e.target.value)
    }

    return (
        <div className={styles.scaleSelectorController}>
            <FormControl className={styles.keyController}>
                <InputLabel id="select-key-label">Select Your Key</InputLabel>
                <Select
                    labelId="select-key-label"
                    id="key-select"
                    defaultValue={keyChange ?? ''}
                    label="Key"
                    onChange={handleKeyChange}
                >
                    {
                        notes.map((note) => <MenuItem key={note} value={note}>{note}</MenuItem>)
                    }
                </Select>
                <FormHelperText id={styles.keyHelperText}>Select Key</FormHelperText>
            </FormControl>

            <FormControl className={styles.scaleController}>
                <InputLabel id="select-scale-label">Select Your Scale</InputLabel>
                <Select
                    labelId="select-scale-label"
                    id="scale-select"
                    defaultValue={scaleType ?? ''}
                    label="Scale"
                    onChange={(e) => handleScaleTypeChange(e)}
                >
                    {
                        Object.entries(chordTypes).map(
                            (type) => <MenuItem key={type}
                                style={{ backgroundColor: type[1] === null && 'silver' }}
                                disabled={type[1] === null && true}
                                value={type[0]}>{type[0]}
                            </MenuItem>)
                    }
                </Select>
                <FormHelperText id={styles.scaleHelperText}>Select Scale</FormHelperText>
            </FormControl>
        </div>
    )
}

export default ScaleSelectorController

ScaleSelectorController.propTypes = {
    keyChange: PropTypes.string,
    scaleType: PropTypes.string
}