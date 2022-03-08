import { Cell } from "../../models"
import { EPlayerType, IBoardSize } from "../../types/Game"
import { generateGameMap } from "../../utils/game/helpers"
import { chooseCell, resetGame } from "../actions"
import { IGameState } from "./interfaces"
import { reducer } from "./reducer"

const testCellEquality = (received: Cell, expected: Cell) => {
  expect(JSON.stringify(received)).toBe(JSON.stringify(expected))
}

test('Дефолтного состояния доски с пустым экшоном', () => {
  const BoardSize: IBoardSize = { x: 10, y: 10 }
  const initialState: IGameState = {
    BoardSize,
    gameMap: generateGameMap(BoardSize),
    currentPlayer: EPlayerType.cross,
  }
  const newState = reducer(initialState, { type: '' })
  expect(newState.gameMap.length).toBe(11)
  expect(newState.gameMap[0].length).toBe(11)
  expect(newState.currentPlayer).toBe(EPlayerType.cross)
})

test('Выбор ячейки', () => {
  const BoardSize: IBoardSize = { x: 10, y: 10 }
  const initialState: IGameState = {
    BoardSize,
    gameMap: generateGameMap(BoardSize),
    currentPlayer: EPlayerType.cross,
  }
  let chosenCell = new Cell(-3, 3, BoardSize)
  let newState = reducer(initialState, chooseCell(chosenCell))
  let cell = newState.gameMap[2][8]
  chosenCell.chosenByPlayerType = EPlayerType.cross
  testCellEquality(cell, chosenCell)
  expect(newState.currentPlayer).toBe(EPlayerType.circle)

  chosenCell = new Cell(0, -5, BoardSize)
  newState = reducer(newState, chooseCell(chosenCell))
  cell = newState.gameMap[5][0]
  testCellEquality(cell, { ...chosenCell, chosenByPlayerType: EPlayerType.circle })
  expect(newState.currentPlayer).toBe(EPlayerType.cross)
})

test('Сброс доски', () => {
  const BoardSize: IBoardSize = { x: 3, y: 3 }
  const initialCell = new Cell(0, 0, BoardSize, EPlayerType.cross)
  const initialState: IGameState = {
    BoardSize,
    gameMap: generateGameMap(BoardSize, initialCell),
    currentPlayer: EPlayerType.circle,
  }
  const firstCell = new Cell(-1, 2, BoardSize)
  const lastCell = new Cell(-1, 0, BoardSize)
  let newState = reducer(initialState, chooseCell(firstCell))
  newState = reducer(newState, chooseCell(lastCell))
  testCellEquality(newState.gameMap[initialCell.indexes.row][initialCell.indexes.cell], initialCell)
  testCellEquality(newState.gameMap[firstCell.indexes.row][firstCell.indexes.cell], { ...firstCell, chosenByPlayerType: EPlayerType.circle })
  testCellEquality(newState.gameMap[lastCell.indexes.row][lastCell.indexes.cell], { ...lastCell, chosenByPlayerType: EPlayerType.cross })

  newState = reducer(newState, resetGame())

  testCellEquality(newState.gameMap[initialCell.indexes.row][initialCell.indexes.cell], initialCell)
  testCellEquality(newState.gameMap[firstCell.indexes.row][firstCell.indexes.cell], firstCell)
  testCellEquality(newState.gameMap[lastCell.indexes.row][lastCell.indexes.cell], lastCell)
})