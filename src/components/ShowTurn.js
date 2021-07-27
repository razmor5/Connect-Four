import React, { useState } from 'react'
import styles from './ShowTurn.module.css'
import { useSpring, animated } from 'react-spring'

const ShowTurn = (props) => {
  const [flip, setFlip] = useState(false)
  const animation = useSpring({
    reset: true,
    // loop: true,
    reverse: flip,
    // loop: { reverse: true },
    from: { y: 0 },
    to: { y: -50 },
    // { y: 0 },

    config: { duration: 1000 },
    onRest: () => setFlip(!flip),
  })
  return (
    <div className={styles.screen}>
      <animated.div style={animation}>
        <div className={`${styles.turn} ${styles[props.nextTurn]}`}>
          <label>
            {props.nextTurn}'s turn
          </label>
        </div>
      </animated.div>
    </div>
  )
}

export default ShowTurn
