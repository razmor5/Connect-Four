import React, { useState, useEffect } from 'react'
import Column from './Column'
import ShowTurn from './ShowTurn'
import MessageModal from './UI/MessageModal'
import styles from './Board.module.css'

const Board = () => {
  const [turn, setTurn] = useState('white')
  const [winner, setWinner] = useState('white')
  const [board, setBoard] = useState(() => {
    let finalBoard = []
    for (let i = 0; i < 7; i++) {
      finalBoard.push({
        id: i,
        rows: [{ id: 0, isSpoted: false, color: 'white' }, { id: 1, isSpoted: false, color: 'white' }, { id: 2, isSpoted: false, color: 'white' }, { id: 3, isSpoted: false, color: 'white' }, { id: 4, isSpoted: false, color: 'white' }, { id: 5, isSpoted: false, color: 'white' }]
      })
    }
    // console.log(finalBoard)
    return finalBoard
  })

  const isWinSpoted = (four) => {
    if (four.map(item => item.isSpoted).some(isSpoted => isSpoted === false)) {
      return false
    }
    let fourOfColors = four.map(item => item.color)
    return (
      fourOfColors[0] === fourOfColors[1] &&
      fourOfColors[1] === fourOfColors[2] &&
      fourOfColors[2] === fourOfColors[3]
    )
  }

  const isWinSpotedTotal = (board) => {
    //Vertical
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 6 - 3; j++) {
        if (isWinSpoted(board[i].rows.slice(j, j + 4))) {
          return true
        }
      }
    }
    // Horizontal
    for (let i = 0; i < 7 - 3; i++) {
      for (let j = 0; j < 6; j++) {
        if (isWinSpoted(board.slice(i, i + 4).map(item => item.rows[j]))) {
          return true
        }
      }
    }
    // DiagonalUp
    for (let i = 0; i < 7 - 3; i++) {
      for (let j = 6 - 1; j > 6 - 4; j--) {
        let tempBoard = board.slice(i, i + 4)
        for (let k = 0; k < 4; k++) {
          tempBoard[k] = tempBoard[k].rows[j - k]
        }
        if (isWinSpoted(tempBoard)) {
          return true
        }
      }
    }
    // DiagonalDown
    for (let i = 0; i < 7 - 3; i++) {
      for (let j = 0; j < 6 - 3; j++) {
        let tempBoard = board.slice(i, i + 4)
        for (let k = 0; k < 4; k++) {
          tempBoard[k] = tempBoard[k].rows[j + k]
        }
        if (isWinSpoted(tempBoard)) {
          return true
        }
      }
    }
    return false
  }

  const turnSwitchHandler = (row, col) => {
    setBoard(
      board.map(column => {

        if (column.id === col) {
          column.rows.map(bRow => {
            if (bRow.id === row) {
              bRow.isSpoted = true;
              bRow.color = turn;
            }
            return bRow
          })
        }
        return column
      }
      )
    )
    if (turn === 'red') {
      setTurn('green')
    }
    else {
      setTurn('red')
    }
  }

  useEffect(() => {
    if (turn === 'white') {

      if (Math.random() > 0.5) {
        setTurn('green')
      }
      else {
        setTurn('red')
      }
    }
    if (isWinSpotedTotal(board)) {
      if (turn === 'red') {
        setWinner('green')
      }
      else {
        setWinner('red')
      }
    }
    let full = true;
    for (let i of board) {
      for (let j of i.rows) {
        full = full && j.isSpoted
      }
    }
    if (full) {
      setWinner('draw')
    }
  }, [turn])

  const onClickHandler = () => {
    window.location.reload()
  }


  return (
    <>
      <div className={styles.board}>
        {winner !== 'white' && <MessageModal onClick={onClickHandler} title={`${winner === 'draw' ? `its a ${winner}` : `${winner} is the winner`}`} description={'click okay to play again!'} class={winner} />}
        {board.map(item =>
          <Column column={item} onTurnSwitch={turnSwitchHandler} turn={turn} key={item.id} />
        )}
      </div>
      <ShowTurn nextTurn={turn} />
    </>
  )
}

export default Board
