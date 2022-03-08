import template from 'lodash/template'
import { getRandomMessage } from './helpers'
import { IGameNotifierOptions, TPlayerMessage, TPlayerName } from './interfaces'

class GamePlayerNotifier<GPlayerType extends string> {
  private PlayerName: TPlayerName<GPlayerType>

  private PlayerMessage: TPlayerMessage<GPlayerType>

  private notifier: (message: string) => void

  constructor({ PlayerName, notifier, PlayerMessage }: IGameNotifierOptions<GPlayerType>) {
    this.PlayerName = PlayerName
    this.PlayerMessage = PlayerMessage
    this.notifier = notifier
  }

  private getInterpolatedMessage = (message: string, player: GPlayerType): string =>
    template(message)({ playerName: this.PlayerName[player] })

  private getRandomInterpolatedMessage = (messages: string[], player: GPlayerType): string =>
    this.getInterpolatedMessage(getRandomMessage(messages), player)

  notify = (player: GPlayerType) => {
    const { getRandomInterpolatedMessage, notifier, PlayerMessage } = this
    notifier(getRandomInterpolatedMessage(PlayerMessage[player], player))
  }
}

export default GamePlayerNotifier
