import { TCellCoordinates } from '../../types/Game'
import {
  IGetDiagonalCellPositionsOptions,
  IGetHorizontalCellPositionsOptions,
  IGetVerticalCellPositionsOptions,
  TSortingType,
} from './interfaces'

const AddingMethodBySortingType: Record<TSortingType, 'unshift' | 'push'> = {
  asc: 'push',
  desc: 'unshift',
}

export const getDiagonalCellCoordinates = (options: IGetDiagonalCellPositionsOptions): TCellCoordinates => {
  const { x, y, cellPositions, depth, verticalDirection, horizontalDirection, sortingType } = options
  cellPositions[AddingMethodBySortingType[sortingType]]({ y, x })

  if (depth === 1) return cellPositions

  return getDiagonalCellCoordinates({
    x: x + horizontalDirection,
    y: y + verticalDirection,
    depth: depth - 1,
    verticalDirection,
    horizontalDirection,
    cellPositions,
    sortingType,
  })
}

export const getVerticalCellCoordinates = (options: IGetVerticalCellPositionsOptions): TCellCoordinates => {
  const { x, y, cellPositions, depth, verticalDirection } = options
  cellPositions[verticalDirection === -1 ? 'unshift' : 'push']({ y, x })

  if (depth === 1) return cellPositions

  return getVerticalCellCoordinates({ x: x, y: y + verticalDirection, depth: depth - 1, verticalDirection, cellPositions })
}

export const getHorizontalCellCoordinates = (options: IGetHorizontalCellPositionsOptions): TCellCoordinates => {
  const { x, y, cellPositions, depth, horizontalDirection } = options
  cellPositions[horizontalDirection === -1 ? 'unshift' : 'push']({ y, x })

  if (depth === 1) return cellPositions

  return getHorizontalCellCoordinates({ x: x + horizontalDirection, y, depth: depth - 1, horizontalDirection, cellPositions })
}
