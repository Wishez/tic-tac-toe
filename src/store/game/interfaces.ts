import { EPlayerType, IBoardSize, TGameRow } from "../../types/Game";

export interface IGameState {
  BoardSize: IBoardSize
  gameMap: TGameRow[]
  currentPlayer: EPlayerType
}
