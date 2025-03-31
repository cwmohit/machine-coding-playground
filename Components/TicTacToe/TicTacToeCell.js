import React from 'react'

const TicTacToeCell = ({
    cell,
    cellColor,
    onClickCell,
    value
}) => {
  return (
    <div className={`col-span-1 border border-purple-900 rounded-2xl cursor-pointer text-6xl flex justify-center items-center font-bold ${cellColor}`}
      onClick={() => onClickCell(cell)}
    ><span className={value ? 'visible' : 'invisible'}>{value || '0'}</span></div>
  )
}

export default TicTacToeCell;