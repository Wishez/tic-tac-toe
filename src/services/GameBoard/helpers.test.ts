import { getDiagonalCellCoordinates, getHorizontalCellCoordinates, getVerticalCellCoordinates } from "./helpers"

describe('Получение n координат', () => {

  test('По диагонали на 5 ячеек', () => {
    const x = 3
    const y = 5
    const depth = 5
    const cellIndexesToCheck = [0, 1, 2, 3, 4]

    const topLeftCellPositions = getDiagonalCellCoordinates({
      x,
      y,
      cellPositions: [],
      verticalDirection: -1,
      horizontalDirection: -1,
      depth,
      sortingType: 'asc',
    })
    expect(topLeftCellPositions.length).toBe(depth)
    cellIndexesToCheck.forEach((cellIndex) => {
      expect(topLeftCellPositions[cellIndex]).toEqual({ x: x - cellIndex, y: y - cellIndex })
    })

    const topRightCellPositions = getDiagonalCellCoordinates({
      x,
      y,
      cellPositions: [],
      verticalDirection: -1,
      horizontalDirection: 1,
      depth,
      sortingType: 'asc',
    })
    expect(topRightCellPositions.length).toBe(depth)
    cellIndexesToCheck.forEach((cellIndex) => {
      expect(topRightCellPositions[cellIndex]).toEqual({ x: x + cellIndex, y: y - cellIndex })
    })

    const bottomLeftCellPositions = getDiagonalCellCoordinates({
      x,
      y,
      cellPositions: [],
      verticalDirection: 1,
      horizontalDirection: -1,
      depth,
      sortingType: 'asc',
    })
    expect(bottomLeftCellPositions.length).toBe(depth)
    cellIndexesToCheck.forEach((cellIndex) => {
      expect(bottomLeftCellPositions[cellIndex]).toEqual({ x: x - cellIndex, y: y + cellIndex })
    })

    const bottomRightCellPositions = getDiagonalCellCoordinates({
      x,
      y,
      cellPositions: [],
      verticalDirection: 1,
      horizontalDirection: 1,
      depth,
      sortingType: 'asc',
    })
    expect(bottomRightCellPositions.length).toBe(depth)
    cellIndexesToCheck.forEach((cellIndex) => {
      expect(bottomRightCellPositions[cellIndex]).toEqual({ x: x + cellIndex, y: y + cellIndex })
    })
  })

  test('По вертикали на 10 ячеек', () => {
    const x = 5
    const y = 3
    const depth = 10
    const cellIndexesToCheck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const topCellPositions = getVerticalCellCoordinates({
      x,
      y,
      cellPositions: [],
      verticalDirection: -1,
      depth,
    })
    expect(topCellPositions.length).toBe(depth)
    cellIndexesToCheck.forEach((cellIndex) => {
      expect(topCellPositions[cellIndex]).toEqual({ x, y: y - depth + (cellIndex + 1) })
    })

    const bottomCellPositions = getVerticalCellCoordinates({
      x,
      y,
      cellPositions: [],
      verticalDirection: 1,
      depth,
    })
    expect(bottomCellPositions.length).toBe(depth)
    cellIndexesToCheck.forEach((cellIndex) => {
      expect(bottomCellPositions[cellIndex]).toEqual({ x, y: y + cellIndex })
    })
  })

  test('По горизонтали на 7 ячеек', () => {
    const x = 100
    const y = 40
    const depth = 7
    const cellIndexesToCheck = [0, 1, 2, 3, 4, 5, 6]
    const leftCellPositions = getHorizontalCellCoordinates({
      x,
      y,
      cellPositions: [],
      horizontalDirection: -1,
      depth,
    })
    expect(leftCellPositions.length).toBe(depth)
    cellIndexesToCheck.forEach((cellIndex) => {
      expect(leftCellPositions[cellIndex]).toEqual({ x: x - depth + (cellIndex + 1), y })
    })

    const rightCellPositions = getHorizontalCellCoordinates({
      x,
      y,
      cellPositions: [],
      horizontalDirection: 1,
      depth,
    })
    expect(rightCellPositions.length).toBe(depth)
    cellIndexesToCheck.forEach((cellIndex) => {
      expect(rightCellPositions[cellIndex]).toEqual({ x: x + cellIndex, y })
    })
  })
})