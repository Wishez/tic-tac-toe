import React, { FC, memo } from 'react'
import { IPlayerProps } from './interfaces'
import './Player.scss'

const Player: FC<IPlayerProps> = ({ type }) => <div className={`player player_${type}`} />

export default memo(Player)
