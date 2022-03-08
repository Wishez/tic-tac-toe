import { createAction } from '@reduxjs/toolkit'
import { Cell } from '../models'

export const chooseCell = createAction<Cell>('@game/CHOOSE_CELL')
export const resetGame = createAction('@game/RESET_GAME')
