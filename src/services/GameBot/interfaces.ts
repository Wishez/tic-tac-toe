import { EPlayerType, ICellCoordinates, TGameMap } from "../../types/Game"
import GameBoard from "../GameBoard/GameBoard"
import { IWinningState } from "../GameBoard/interfaces"

export interface IGameBotProps {
  maxDepth?: 0 | 1 | 2| 3 | 4
  playerType?: EPlayerType
}

export interface IGetBestMoveOptions {
  board: GameBoard
  maximizing?: boolean
  depth?: number
}

export interface IGameBotWorkerMessageEvent { action: 'gameOver' | 'newMove'; winningState: IWinningState; bestCoordinates: ICellCoordinates }

export type TGameBotWorkerMessageEvent = MessageEvent<IGameBotWorkerMessageEvent>

export interface IBotEventData {
  gameMap: TGameMap
  fieldsQuantityToWin: number
  action: 'getBestMove'
}
