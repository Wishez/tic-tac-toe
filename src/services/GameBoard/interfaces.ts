import { EPlayerType, TCellCoordinates } from "../../types/Game"

export type TSortingType = 'asc' | 'desc'

export interface IGetDiagonalCellPositionsOptions {
  x: number
  y: number
  cellPositions: TCellCoordinates
  depth: number
  verticalDirection: 1 | -1
  horizontalDirection: 1 | -1
  sortingType: TSortingType
}

export interface IGetVerticalCellPositionsOptions {
  x: number
  y: number
  cellPositions: TCellCoordinates
  depth: number
  verticalDirection: 1 | -1
}

export interface IGetHorizontalCellPositionsOptions {
  x: number
  y: number
  cellPositions: TCellCoordinates
  depth: number
  horizontalDirection: 1 | -1
}

export interface IWinningState<GPlayerType = EPlayerType> {
  player: GPlayerType | undefined,
  isWon: boolean
}
