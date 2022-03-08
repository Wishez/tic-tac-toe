import { MouseEventHandler } from "react";

export type TButtonModifier = 'main' | 'secondary'

export interface IButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>
  modifiers?: TButtonModifier[]
  isUnstyled?: boolean
  className?: string
  isDisabled?: boolean
  text?: string
}
