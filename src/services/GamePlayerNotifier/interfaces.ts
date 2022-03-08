export type TPlayerName<GPlayerType extends string> = Record<GPlayerType, string>
export type TPlayerMessage<GPlayerType extends string> = Record<GPlayerType, string[]>

export interface IGameNotifierOptions<GPlayerType extends string> {
  PlayerName: TPlayerName<GPlayerType>
  PlayerMessage: TPlayerMessage<GPlayerType>
  notifier: (message: string) => void
}
