import React, { FC, memo } from 'react'
import classNames from 'classnames'
import isEqual from 'lodash/isEqual'
import { IButtonProps } from './interfaces'
import './Button.scss'

const Button: FC<IButtonProps> = ({ children, onClick, modifiers, isUnstyled, className, isDisabled, text }) => (
  <button
    className={classNames(
      'button',
      className,
      modifiers?.reduce((result, modifier) => `${result} button_${modifier}`, ''),
      { button_unstyled: isUnstyled, button_disabled: isDisabled },
    )}
    type="button"
    onClick={onClick}
    disabled={isDisabled}
  >
    {text || children}
  </button>
)

export default memo(Button, isEqual) as typeof Button
