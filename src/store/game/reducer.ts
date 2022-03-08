import { createReducer, createSelector, PayloadAction } from '@reduxjs/toolkit'
import { Cell } from '../../models'
import { EPlayerType } from '../../types/Game'
import { generateGameMap } from '../../utils/game/helpers'
import { chooseCell, resetGame } from '../actions'
import { TRootState } from '../interfaces'
import { GameBoardSize, PlayerOpponent } from './constants'
import { IGameState } from './interfaces'

const initialState: IGameState = {
  BoardSize: GameBoardSize,
  gameMap: generateGameMap(GameBoardSize, new Cell(0, 0, GameBoardSize, EPlayerType.cross)),
  currentPlayer: EPlayerType.circle,
}

const reducerName = 'game'
export const reducer = createReducer(initialState, {
  [chooseCell.type]: (state, { payload }: PayloadAction<Cell>) => {
    const { gameMap, BoardSize } = state

    const { x, y } = payload.coordinates
    const { row, cell } = payload.indexes
    gameMap[row][cell] = new Cell(y, x, BoardSize, state.currentPlayer)
    state.currentPlayer = PlayerOpponent[state.currentPlayer]
  },
  [resetGame.type]: () => initialState,
})

const getState = () => (state: TRootState) => state[reducerName]
export const getGameMap = createSelector(getState(), ({ gameMap }) => gameMap)
export const getCurrentPlayer = createSelector(getState(), ({ currentPlayer }) => currentPlayer)
