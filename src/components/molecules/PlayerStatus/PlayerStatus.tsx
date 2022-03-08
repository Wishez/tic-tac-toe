import React, { FC } from 'react'
import classNames from 'classnames'
import { Loader, Player } from '../../ui'
import { IPlayerStatusProps } from './interfaces'
import './PlayerStatus.scss'

const PlayerStatus: FC<IPlayerStatusProps> = ({ isDisabled, type, username, modifier = 'left', shouldShowLoader = false }) => (
  <section className={classNames('player-status', { 'player-status_disabled': isDisabled, [`player-status_${modifier}`]: modifier })}>
    <Loader isVisible={shouldShowLoader} width={25} height={25} wrapperClass="player-status__loader" />
    <p className="player-status__title">{username}</p>
    <Player type={type} />
  </section>
)

export default PlayerStatus
