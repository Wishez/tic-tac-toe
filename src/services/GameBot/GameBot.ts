import { EPlayerType, TCellCoordinates } from '../../types/Game'
import { GameBoard } from '..'
import { IGameBotProps, IGetBestMoveOptions } from './interfaces'

class GameBot {
  maxDepth: number

  nodesMap: Map<number, TCellCoordinates>

  botPlayerType: EPlayerType

  constructor({ maxDepth = 4, playerType = EPlayerType.cross }: IGameBotProps = {}) {
    this.maxDepth = maxDepth
    this.nodesMap = new Map()
    this.botPlayerType = playerType
  }

  getBestMove = ({ board, maximizing = true, depth = 0 }: IGetBestMoveOptions) => {
    const { nodesMap, maxDepth } = this
    const botPlayerType = maximizing ? EPlayerType.cross : EPlayerType.circle
    const fieldsQuantityToWin = board.fieldsQuantityToWin
    const isNewMove = depth === 0

    if (isNewMove) nodesMap.clear()

    const winningState = board.isGameOver()

    if (winningState.isWon || depth === maxDepth) {
      switch (winningState.player) {
        case EPlayerType.cross:
          return 100 - depth
        case EPlayerType.circle:
          return -100 + depth
        default:
          return 0
      }
    }

    let best = maximizing ? -100 : 100
    const minMaxFunctionName = maximizing ? 'max' : 'min'
    board.getAvailableCells().forEach(row => {
      row.forEach(cell => {
        const { coordinates } = cell
        const nextBoard = new GameBoard(board.state, fieldsQuantityToWin)
        nextBoard.setPlayerChoice(botPlayerType, coordinates)
        const possibleBestValue = this.getBestMove({ board: nextBoard, maximizing: false, depth: depth + 1 })

        if (typeof possibleBestValue === 'number') {
          best = Math[minMaxFunctionName](best, possibleBestValue)

          if (isNewMove) {
            this.nodesMap.set(
              possibleBestValue,
              this.nodesMap.has(possibleBestValue) ? [...this.nodesMap.get(possibleBestValue)!, coordinates] : [coordinates],
            )
          }
        }
      })
    })

    if (isNewMove) {
      const bestCoordinates = this.nodesMap.get(best)

      if (Array.isArray(bestCoordinates)) {
        const value = bestCoordinates[Math.floor(Math.random() * bestCoordinates.length)]

        return value
      }
    }

    return best
  }
}

export default GameBot
