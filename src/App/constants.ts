import { TPlayerMessage } from '../services/GamePlayerNotifier/interfaces'
import { EPlayerType, TGamePlayerName } from '../types/Game'

export const PlayerTurnMessage: TPlayerMessage<EPlayerType> = {
  [EPlayerType.cross]: [
    '<%= playerName %> думает!',
    '<%= playerName %> в раздумье!',
    '<%= playerName %> не хочет проигрывать, поэтому ищет лучший ход!',
  ],
  [EPlayerType.circle]: ['Ваш черёд!', 'Ваш ход!', 'Вы ходите!'],
}

export const PlayerWinningMessage: TPlayerMessage<EPlayerType> = {
  [EPlayerType.cross]: [
    '<%= playerName %> — пацан, который пришёл к успеху!',
    '<%= playerName %> — компьютер, поэтому выиграл!',
    '<%= playerName %> — паравозик, который смог!',
  ],
  [EPlayerType.circle]: [
    'GG, WP. Вы супер-бомба!',
    'Вы обыграли искусственный интелект! Моё почтение',
    'Вы победили! Гуд джоб',
    'Congratulations! Ваш разум поражает',
  ],
}

export const PlayerName: TGamePlayerName = { [EPlayerType.cross]: 'shiningfinger', [EPlayerType.circle]: 'Великий' }

export const fieldsQuantityToWin = 3
