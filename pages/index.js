import React from 'react'
import Controls from './Controls'
import styles from '../styles/Styles.module.css'

const index = () => {
  return (
    <div className={styles.mainStyle}>
        <div className={styles.logo}/>
        <Controls />
    </div>

  )
}

export default index