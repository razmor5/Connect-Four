import React, { useState } from 'react'
import Spot from './Spot'
import styles from './Column.module.css'



const Column = (props) => {

  // const [column, setColumn] = useState(
  //   [
  //     { id: 0, isSpoted: false, color: 'white' },
  //     { id: 1, isSpoted: false, color: 'white' },
  //     { id: 2, isSpoted: false, color: 'white' },
  //     { id: 3, isSpoted: false, color: 'white' },
  //     { id: 4, isSpoted: false, color: 'white' },
  //     { id: 5, isSpoted: false, color: 'white' }
  //   ]
  // )
  const [insertTo, setInsertTo] = useState(5)

  const onClickHandler = () => {
    if (insertTo === -1) {
      return;
    }
    // setColumn(column.map(col => {

    //   if (col.id === insertTo) {
    //     col.color = props.turn
    //   }
    //   return col
    // }
    // ))
    props.onTurnSwitch(insertTo, props.column.id)
    setInsertTo(insertTo - 1)
  }

  return (
    <div className={styles.column} onClick={onClickHandler}>
      {props.column.rows.map(item =>
        <Spot key={item.id} color={item.color} />
      )}
    </div>
  )
}

export default Column
