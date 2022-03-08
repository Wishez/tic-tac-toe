import { Cell } from '../models'

export enum EPlayerType {
  cross = 'cross',
  circle = 'circle',
}

export interface ICellCoordinates {
  x: number
  y: number
}

export interface ICellIndexes {
  row: number
  cell: number
}

export type TGameRow = Cell[]

export type TGameMap = TGameRow[]

export type TCellCoordinates = ICellCoordinates[]

export type TGamePlayerName = Record<EPlayerType, string>

export interface IBoardSize {
  x: number
  y: number
}
