import { IWinningState } from "../../../services/GameBoard/interfaces"
import { EPlayerType, TGamePlayerName } from "../../../types/Game"

export interface IControlsPanelProps {
  className?: string
  currentPlayer: EPlayerType
  winningState?: IWinningState
  resetGame(): void
  PlayerName: TGamePlayerName
}
