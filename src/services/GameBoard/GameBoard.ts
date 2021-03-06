import cloneDeep from 'lodash/cloneDeep'
import { Cell } from '../../models'
import { EPlayerType, ICellCoordinates, TCellCoordinates, TGameMap } from '../../types/Game'
import { getIndexByCoordinate } from '../../utils/game/helpers'
import { getDiagonalCellCoordinates, getHorizontalCellCoordinates, getVerticalCellCoordinates } from './helpers'
import { IWinningState } from './interfaces'

class GameBoard {
  state: TGameMap

  fieldsQuantityToWin: number

  constructor(gameMap: TGameMap, fieldsQuantityToWin = 3) {
    this.state = cloneDeep(gameMap)
    this.fieldsQuantityToWin = fieldsQuantityToWin
  }

  setPlayerChoice = (playerChoice: EPlayerType, coordinates: ICellCoordinates): boolean => {
    const currentCell = this.getCellState(coordinates)
    if (!currentCell || currentCell.chosenByPlayerType) return false

    currentCell.chosenByPlayerType = playerChoice

    return true
  }

  getCellState = (coordinates: ICellCoordinates): Cell | null => {
    const row = this.state[getIndexByCoordinate(this.state.length, coordinates.y)]

    if (!row) return null

    return row[getIndexByCoordinate(row.length, coordinates.x)]
  }

  getAvailableCells = (): TGameMap => this.state.map(row => row.filter(({ chosenByPlayerType }) => !chosenByPlayerType))

  getChosenCells = (): TGameMap =>
    this.state.reduce((result: TGameMap, row) => {
      const filteredCells = row.filter(({ chosenByPlayerType }) => chosenByPlayerType)

      return filteredCells.length ? [...result, filteredCells] : result
    }, [])

  getWinningStateByCoordinates = (cellCoordinates: TCellCoordinates): IWinningState => {
    const { fieldsQuantityToWin, getCellState } = this
    let chosenOrderedCellsQuantity = 0
    let lastPlayer: EPlayerType | undefined
    let isWon = false
    const coordinatesLength = cellCoordinates.length

    for (let i = 0; i < coordinatesLength; i += 1) {
      const coordinates = cellCoordinates[i]
      const cell = getCellState(coordinates)
      if (!cell) continue

      const { chosenByPlayerType } = cell
      const isEmptyCell = typeof chosenByPlayerType === 'undefined'

      if (chosenByPlayerType !== lastPlayer || isEmptyCell) {
        chosenOrderedCellsQuantity = 0

        if (isEmptyCell) {
          lastPlayer = undefined
          continue
        }
      }

      lastPlayer = chosenByPlayerType
      chosenOrderedCellsQuantity += 1

      isWon = chosenOrderedCellsQuantity === fieldsQuantityToWin
      // ???????? ?????????????? ?????? ???????? ???????????????????? ???????????????????? ?????????? ?????? ???????????????? ????????????, ?????? ???????????????? ?????????????? ?????????? ?????? ????????????????
      if (isWon || coordinatesLength - i < fieldsQuantityToWin - chosenOrderedCellsQuantity) break
    }

    return { player: isWon ? lastPlayer : undefined, isWon }
  }

  isGameOver = (): IWinningState => {
    // ???????????????? ???? ??????????????????, ?????????????????????? ?? ??????????????????
    const { fieldsQuantityToWin, getChosenCells, getWinningStateByCoordinates } = this
    const chosenCells = getChosenCells()
    const depth = fieldsQuantityToWin - 1

    const isFieldContainingPossibleWinByVertical = chosenCells.length >= fieldsQuantityToWin

    for (const row of chosenCells) {
      const isRowContainingPossibleWin = row.length >= fieldsQuantityToWin

      for (const cell of row) {
        const { coordinates } = cell
        const { x, y } = coordinates

        if (!isFieldContainingPossibleWinByVertical) continue

        // ???????????????? ?? 4?? ?????????????????????? ???? fieldsQuantityToWin ??????????
        // ?????????????? ??\??
        const leftDiagonalWinningState: IWinningState = getWinningStateByCoordinates([
          // ?????????? ??????????
          ...getDiagonalCellCoordinates({
            x: x - 1,
            y: y - 1,
            cellPositions: [],
            horizontalDirection: -1,
            verticalDirection: -1,
            depth,
            sortingType: 'desc',
          }),
          coordinates,
          // ???????????? ????????
          ...getDiagonalCellCoordinates({
            x: x + 1,
            y: y + 1,
            cellPositions: [],
            horizontalDirection: 1,
            verticalDirection: 1,
            depth,
            sortingType: 'asc',
          }),
        ])

        if (leftDiagonalWinningState.isWon) return leftDiagonalWinningState

        // ???????? ???? ????????????????, ???? ??/??
        const rightDiagonalWinningState: IWinningState = getWinningStateByCoordinates([
          // ?????????? ????????
          ...getDiagonalCellCoordinates({
            x: x - 1,
            y: y + 1,
            cellPositions: [],
            horizontalDirection: -1,
            verticalDirection: 1,
            depth,
            sortingType: 'desc',
          }),
          coordinates,
          // ???????????? ??????????
          ...getDiagonalCellCoordinates({
            x: x + 1,
            y: y - 1,
            cellPositions: [],
            horizontalDirection: 1,
            verticalDirection: -1,
            depth,
            sortingType: 'asc',
          }),
        ])

        if (rightDiagonalWinningState.isWon) return rightDiagonalWinningState

        // ???????? ?????????????????????? ????????, ???? ???????????????????? ???? ?????????????????? ??!??
        const verticalWinningState = getWinningStateByCoordinates([
          ...getVerticalCellCoordinates({
            verticalDirection: -1,
            cellPositions: [],
            depth,
            x,
            y: y - 1,
          }),
          coordinates,
          ...getVerticalCellCoordinates({
            verticalDirection: 1,
            cellPositions: [],
            depth,
            x,
            y: y + 1,
          }),
        ])

        if (verticalWinningState.isWon) return verticalWinningState

        if (!isRowContainingPossibleWin) continue
        // ???????????? ?????????????????? ?????????????????????? ??---??
        const horizontalWinningState = getWinningStateByCoordinates([
          ...getHorizontalCellCoordinates({
            horizontalDirection: -1,
            cellPositions: [],
            depth,
            x: x - 1,
            y,
          }),
          coordinates,
          ...getHorizontalCellCoordinates({
            horizontalDirection: 1,
            cellPositions: [],
            depth,
            x: x + 1,
            y,
          }),
        ])

        if (horizontalWinningState.isWon) return horizontalWinningState
      }
    }

    return {
      isWon: false,
      player: undefined,
    }
  }
}

export default GameBoard
