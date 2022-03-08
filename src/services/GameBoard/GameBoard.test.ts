import { EPlayerType, IBoardSize, ICellCoordinates  , TCellCoordinates } from "../../types/Game"
import { generateGameMap } from "../../utils/game/helpers"
import GameBoard from "./GameBoard"

const createGameBoardInstance = (BoardSize: IBoardSize, fieldsQuantityToWin: number) => {
  const gameMap = generateGameMap(BoardSize)
  return { board: new GameBoard(gameMap, fieldsQuantityToWin), gameMap }
}

test('Создание доски 10x10', () => {
  const BoardSize: IBoardSize = { x: 10, y: 10 }
  const { board, gameMap } = createGameBoardInstance(BoardSize, 5)
  expect(board.state.length).toBe(11)
  expect(board.fieldsQuantityToWin).toBe(5)
  expect(board.state).toEqual(gameMap)
})

test('Получение состояния ячейки', () => {
  const BoardSize: IBoardSize = { x: 10, y: 10 }
  const coordinates: ICellCoordinates = { x: 2, y: 3 }
  const { board } = createGameBoardInstance(BoardSize, 5)

  expect(board.getCellState(coordinates)?.coordinates).toEqual(coordinates)
})

test('Выбор клетки игроком', () => {
  const BoardSize: IBoardSize = { x: 10, y: 10 }
  const { board } = createGameBoardInstance(BoardSize, 5)
  const cellCoordinates: ICellCoordinates = { x: -5, y: -5 }
  const isCellSet = board.setPlayerChoice(EPlayerType.circle, cellCoordinates)
  const chosenCell = board.getCellState(cellCoordinates)

  expect(isCellSet).toBeTruthy()
  expect(chosenCell?.chosenByPlayerType).toBe(EPlayerType.circle)
  expect(chosenCell?.coordinates).toEqual(cellCoordinates)

  const isCellSetAgain = board.setPlayerChoice(EPlayerType.cross, cellCoordinates)
  expect(isCellSetAgain).toBeFalsy()

  const isNotExistedCellSet = board.setPlayerChoice(EPlayerType.cross, { x: 100, y: -100 })
  expect(isNotExistedCellSet).toBeFalsy()
})

test('Получение всех доступных ячеек', () => {
  const BoardSize: IBoardSize = {
    x: 2,
    y: 2,
  }
  const { board } = createGameBoardInstance(BoardSize, 3)

  const firstCellCoordinates: ICellCoordinates = { x: 1, y: 1 }
  const secondCellCoordinates: ICellCoordinates = { x: 1, y: -1 }
  const thirdCellCoordinates: ICellCoordinates = { x: 0, y: 0 }
  board.setPlayerChoice(EPlayerType.circle, firstCellCoordinates)
  board.setPlayerChoice(EPlayerType.cross, secondCellCoordinates)
  board.setPlayerChoice(EPlayerType.circle, thirdCellCoordinates)

  const availableCells = board.getAvailableCells()
  expect(availableCells.reduce((result, row) => result + row.length, 0)).toBe(6)
  expect(availableCells[0][1].chosenByPlayerType).toBeUndefined()
})

test('Получение всех заполненых ячеек', () => {
  const BoardSize: IBoardSize = { x: 3, y: 3 }
  const { board } = createGameBoardInstance(BoardSize, 3)
  const firstCellCoordinates: ICellCoordinates = { x: -1, y: -1 }
  const secondCellCoordinates: ICellCoordinates = { x: 0, y: -1 }
  const thirdCellCoordinates: ICellCoordinates = { x: 1, y: -1 }
  board.setPlayerChoice(EPlayerType.circle, firstCellCoordinates)
  board.setPlayerChoice(EPlayerType.cross, secondCellCoordinates)
  board.setPlayerChoice(EPlayerType.circle, thirdCellCoordinates)

  const chosenCells = board.getChosenCells()
  expect(chosenCells.reduce((result, row) => result + row.length, 0)).toBe(3)
  expect(chosenCells[0][0].coordinates).toEqual(firstCellCoordinates)
  expect(chosenCells[0][1].coordinates).toEqual(secondCellCoordinates)
  expect(chosenCells[0][2].coordinates).toEqual(thirdCellCoordinates)
})

describe('Получения состояния выигрыша', () => {
  const BoardSize: IBoardSize = { x: 3, y: 3 }

  test('Игра не выиграна', () => {
    const { board } = createGameBoardInstance(BoardSize, 3)
    const notWinningCoordinates: TCellCoordinates = [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 0 }]

    board.setPlayerChoice(EPlayerType.circle, notWinningCoordinates[0])
    board.setPlayerChoice(EPlayerType.cross, notWinningCoordinates[1])
    board.setPlayerChoice(EPlayerType.circle, notWinningCoordinates[2])

    const winningState = board.getWinningStateByCoordinates(notWinningCoordinates)
    const gameWinningState = board.isGameOver()

    expect(winningState.isWon).toBeFalsy()
    expect(gameWinningState.isWon).toBeFalsy()
  })

  test('Выигрыш кругалёчка', () => {
    const { board } = createGameBoardInstance(BoardSize, 3)
    const circleWinningCoordinates: TCellCoordinates = [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }]
    board.setPlayerChoice(EPlayerType.circle, circleWinningCoordinates[0])
    board.setPlayerChoice(EPlayerType.circle, circleWinningCoordinates[1])
    board.setPlayerChoice(EPlayerType.circle, circleWinningCoordinates[2])

    const winningState = board.getWinningStateByCoordinates(circleWinningCoordinates)
    const gameWinningState = board.isGameOver()

    expect(winningState.isWon).toBeTruthy()
    expect(winningState.player).toBe(EPlayerType.circle)
    expect(gameWinningState.isWon).toBeTruthy()
    expect(gameWinningState.player).toBe(EPlayerType.circle)
  })

  test('Необычный кейс', () => {
    const { board } = createGameBoardInstance(BoardSize, 3)
    board.setPlayerChoice(EPlayerType.cross, { x: 1, y: 1 })
    board.setPlayerChoice(EPlayerType.circle, { x: -1, y: 1 })
    board.setPlayerChoice(EPlayerType.cross, { x: -2, y: 0 })
    board.setPlayerChoice(EPlayerType.circle, { x: 1, y: 0 })
    board.setPlayerChoice(EPlayerType.cross, { x: 0, y: 1 })
    board.setPlayerChoice(EPlayerType.circle, { x: 1, y: 0 })
    board.setPlayerChoice(EPlayerType.cross, { x: 1, y: 2 })
    board.setPlayerChoice(EPlayerType.circle, { x: -1, y: 0 })

    const gameWinningState = board.isGameOver()

    expect(gameWinningState.isWon).toBeFalsy()
    expect(gameWinningState.player).toBeUndefined()
  })

  test('Необычный кейс', () => {
    const { board } = createGameBoardInstance(BoardSize, 3)
    board.setPlayerChoice(EPlayerType.cross, { x: 0, y: 0 })
    board.setPlayerChoice(EPlayerType.circle, { x: 0, y: -1 })
    board.setPlayerChoice(EPlayerType.cross, { x: -2, y: 2 })
    board.setPlayerChoice(EPlayerType.circle, { x: -1, y: 1 })
    board.setPlayerChoice(EPlayerType.cross, { x: 2, y: -2 })

    const gameWinningState = board.isGameOver()

    expect(gameWinningState.isWon).toBeFalsy()
    expect(gameWinningState.player).toBeUndefined()
  })
})

