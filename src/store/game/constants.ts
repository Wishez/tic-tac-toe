import { EPlayerType, IBoardSize } from '../../types/Game'

export const PlayerOpponent: Record<EPlayerType, EPlayerType> = {
  [EPlayerType.circle]: EPlayerType.cross,
  [EPlayerType.cross]: EPlayerType.circle,
}

export const GameBoardSize: IBoardSize = {
  x: 3,
  y: 3,
}
