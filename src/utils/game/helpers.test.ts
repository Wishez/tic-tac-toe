import { Cell } from "../../models"
import { EPlayerType, TGameMap, IBoardSize } from "../../types/Game"
import { generateGameMap, getIndexByCoordinate } from "./helpers"

test('Создание игровой ячеейки', () => {
  const BoardSize: IBoardSize = { x: 50, y: 50 }
  const cell: Cell = new Cell(25, 50, BoardSize)
  expect(cell.coordinates).toEqual({ y: 25, x: 50 })
  expect(cell.indexes).toEqual({ row: 50, cell: 75 })
})

test('Генерация карты 50x50 с первым ходом', () => {
  const BoardSize: IBoardSize = { x: 50, y: 50 }
  const cell = new Cell(1, 1, BoardSize, EPlayerType.cross)
  const map: TGameMap = generateGameMap(BoardSize, cell)
  expect(map[26][26]).toEqual(cell)
  expect(map[30][30].coordinates).toEqual({ x: 5, y: 5 })
  expect(map[1][5].coordinates).toEqual({ x: -20, y: -24 })
})

test('Получение индекса по координате', () => {
  const length: number = 10
  const x = -4
  const y = 4
  expect(getIndexByCoordinate(length, x)).toBe(1)
  expect(getIndexByCoordinate(length, y)).toBe(9)
})
