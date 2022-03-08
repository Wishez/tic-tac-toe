import Cell from "./Cell"

test('Создание игровой ячеейки', () => {
  const cell = new Cell(25, 50, { y: 50, x: 50 })
  expect(cell.coordinates).toEqual({ y: 25, x: 50 })
  expect(cell.indexes).toEqual({ row: 50, cell: 75 })
  expect(cell.chosenByPlayerType).toBeUndefined()
})
