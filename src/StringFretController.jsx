import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types';
import { FormControl, MenuItem, FormHelperText, Select, InputLabel } from '@mui/material'
import { SelectedNotesContext } from '../Context/SelectedNotesContext';
import styles from '../styles/Styles.module.css'

const StringFretController = ({ numOfStrings, numOfFrets }) => {

    const [stringsControl] = useState([6, 7, 8, 9, 10, 11, 12])
    const [fretsControl] = useState([12, 13, 14, 15, 16,
        17, 18, 19, 20, 21, 22, 23, 24])

    const { setNumOfStrings, setStringSet, setNumOfFrets } = useContext(SelectedNotesContext)


    const handleStrings = (e) => {
        if (Number(e.target.value) < 6) {
            const originalSet = { 1: "E", 2: "B", 3: "G", 4: "D", 5: "A", 6: "E" }

            let userSet = Number(e.target.value) === 0 ? originalSet :
                Object.fromEntries(Object.entries(originalSet).slice(-Number(e.target.value)));
            setStringSet(userSet)
            setNumOfStrings(Object.keys(userSet).length)
        } else {
            let userSet = { 1: "E", 2: "B", 3: "G", 4: "D", 5: "A", 6: "E" }
            let secondarySet = {
                7: "Gb", 8: "B", 9: "E", 10: "A", 11: "D", 12: "G"
            }

            userSet = Object.assign({}, userSet, Object.fromEntries(Object.entries(secondarySet).slice(0, Number(e.target.value) - 6)))
            setStringSet(userSet)
            setNumOfStrings(Object.keys(userSet).length)
        }
    }

    return (
        <div className={styles.stringFretController}>
            <FormControl className={styles.stringController}>
                <InputLabel id="num-of-strings-select-label">Strings</InputLabel>
                <Select
                    labelId="num-of-strings-select-label"
                    label="Strings"
                    defaultValue={numOfStrings ?? ''}
                    onChange={handleStrings}
                >
                    {
                        stringsControl.map((stringNum) => <MenuItem key={stringNum} value={stringNum}>{stringNum}</MenuItem>)
                    }
                </Select>
                <FormHelperText id={styles.stringHelperText}>Select Number of Strings</FormHelperText>
            </FormControl>
            <FormControl className={styles.fretsController}>
                <InputLabel id="num-of-frets-select-label">Frets</InputLabel>
                <Select
                    labelId="num-of-frets-select-label"
                    id="num-of-frets-label"
                    defaultValue={numOfFrets ?? ''}
                    label="Frets"
                    onChange={e => setNumOfFrets(e.target.value <= 24 && e.target.value >= 12 ? e.target.value : 12)}
                >
                    {
                        fretsControl.map((fretsNum) => <MenuItem key={fretsNum} value={fretsNum}>{fretsNum}</MenuItem>)
                    }
                </Select>

                <FormHelperText id={styles.fretHelperText}>Select Number of Frets</FormHelperText>
            </FormControl>
        </div>
    )
}

export default StringFretController

StringFretController.propTypes = {
    numOfStrings: PropTypes.number,
    numOfFrets: PropTypes.number,
    setNumOfStrings: PropTypes.func,
    setStringSet: PropTypes.func
};