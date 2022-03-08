import { EPlayerType } from '../../types/Game'
import { JestMockWorker } from '../../types/JestMockWorker'
import GameBoard from '../GameBoard'
import GameBot from './GameBot'
import { IBotEventData, IGameBotWorkerMessageEvent } from './interfaces'
import { isCellCoordinates } from './typeguards'

/* eslint-disable  @typescript-eslint/no-explicit-any */
const ctx: Worker = self as any

const bot = new GameBot({ maxDepth: 3 })

ctx.addEventListener('message', (event: MessageEvent<IBotEventData>) => {
  const { gameMap, fieldsQuantityToWin, action } = event.data

  switch (action) {
    case 'getBestMove':
      const board = new GameBoard(gameMap, fieldsQuantityToWin)
      const winningState = board.isGameOver()

      if (winningState.isWon) {
        ctx.postMessage({ action: 'gameOver', winningState } as IGameBotWorkerMessageEvent)

        return
      }

      const bestCoordinates = bot.getBestMove({ board })

      if (isCellCoordinates(bestCoordinates)) {
        board.setPlayerChoice(EPlayerType.cross, bestCoordinates)
        const winningStateAfterMove = board.isGameOver()
        ctx.postMessage({
          action: winningStateAfterMove.isWon ? 'gameOver' : 'newMove',
          winningState: winningStateAfterMove,
          bestCoordinates,
        } as IGameBotWorkerMessageEvent)
      }

      break
  }
})

export default JestMockWorker
