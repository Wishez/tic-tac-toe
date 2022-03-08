import React, { FC, memo } from 'react'
import { Button, Player } from '../../ui'
import { ICellProps } from './interfaces'
import './Cell.scss'

const Cell: FC<ICellProps> = ({ cell, chooseCell }) => {
  const { chosenByPlayerType } = cell
  const isChosenByPlayer = Boolean(chosenByPlayerType)

  return (
    <Button className="cell" isUnstyled onClick={() => chooseCell(cell)} isDisabled={isChosenByPlayer}>
      {chosenByPlayerType && <Player type={chosenByPlayerType} />}
    </Button>
  )
}

export default memo(Cell)
