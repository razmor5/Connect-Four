import React from 'react'
import styles from './Spot.module.css'

const Spot = (props) => {
  const color = props.color
  return (
    <div className={`${styles.spot} ${styles[color]}`} >
    </div >
  )
}

export default Spot
