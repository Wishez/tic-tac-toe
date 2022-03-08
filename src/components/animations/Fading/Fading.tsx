import React, { FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import { IFadingProps } from './interfaces'
import './Fading.scss'

const Fading: FC<IFadingProps> = ({ isVisible, children }) => (
  <CSSTransition timeout={300} in={isVisible} classNames="fading" mountOnEnter unmountOnExit>
    {children}
  </CSSTransition>
)

export default Fading
