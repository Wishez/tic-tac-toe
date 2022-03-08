import { EPlayerType } from "../../../types/Game"

export interface IPlayerStatusProps {
  isDisabled?: boolean
  type: EPlayerType
  username: string
  modifier?: 'right' | 'left'
  shouldShowLoader?: boolean
}

