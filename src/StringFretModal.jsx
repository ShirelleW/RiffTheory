import React, { useState } from 'react'
import { Button, Modal, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import StringFretController from './StringFretController';
import styles from '../styles/Styles.module.css'

const StringFretModal = () => {

    const [buttonClick, setButtonClicked] = useState(false)

    const handleOpen = () => {
        setButtonClicked(true)
    }

    const handleClose = () => {
        setButtonClicked(false)
    }
    return (
        <div className={styles.modalController}>
            <Button onClick={handleOpen} id={styles.pickTitle}>1. Customize Your Fretboard</Button>
            {
                buttonClick
                && <Modal
                    className={styles.stringfretmodal}
                    open={open}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box className={styles.stringsFretsBox}>
                        <CloseIcon id={styles.modalExit} onClick={handleClose}></CloseIcon>
                        <StringFretController />
                    </Box>
                </Modal>
            }

        </div>
    )
}

export default StringFretModal