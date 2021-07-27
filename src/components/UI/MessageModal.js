import React from 'react'
import Card from './Card'
import Button from './Button'
import styles from './MessageModal.module.css';
import { useSpring, animated } from 'react-spring'


const MessageModal = (props) => {
  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 5000 }
  })
  return (
    <>
      <animated.div style={animation}>
        <div className={`${styles.backdrop} ${styles[props.class]}`} />
      </animated.div>
      <Card className={styles.modal}>
        <header className={styles.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={styles.content}>
          <p>{props.description}</p>
        </div>
        <footer className={styles.actions}>
          <Button onClick={props.onClick}>Okay</Button>
        </footer>
      </Card>
    </>

  )
}

export default MessageModal
