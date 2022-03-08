import { Cell } from '../../models'
import { IBoardSize, TGameMap, TGameRow } from '../../types/Game'

export const getIndexByCoordinate = (length: number, coordinate: number): number => Math.ceil((length - 1) / 2) + coordinate

export const generateGameMap = (BoardSize: IBoardSize, initialCell?: Cell): TGameMap => {
  const { y: rowsQuantity, x: cellsQuantity } = BoardSize
  const gameMap: TGameMap = []
  const rowCenterIndex: number = Math.ceil(rowsQuantity / 2)

  for (let rowIndex = 0; rowIndex <= rowCenterIndex; rowIndex += 1) {
    const rowNegative: TGameRow = (gameMap[rowCenterIndex - rowIndex] = [new Cell(-rowIndex, 0, BoardSize)])
    const rowPositive: TGameRow = (gameMap[rowCenterIndex + rowIndex] = [new Cell(rowIndex, 0, BoardSize)])

    for (let cellIndex = 1; cellIndex <= Math.ceil(cellsQuantity / 2); cellIndex += 1) {
      rowNegative.push(new Cell(-rowIndex, cellIndex, BoardSize))
      rowNegative.unshift(new Cell(-rowIndex, -cellIndex, BoardSize))
      rowPositive.push(new Cell(rowIndex, cellIndex, BoardSize))
      rowPositive.unshift(new Cell(rowIndex, -cellIndex, BoardSize))
    }
  }

  if (initialCell) {
    const { row, cell } = initialCell.indexes
    gameMap[row][cell] = initialCell
  }

  return gameMap
}
