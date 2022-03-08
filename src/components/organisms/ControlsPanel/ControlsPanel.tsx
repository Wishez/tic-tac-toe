import React, { FC } from 'react'
import classNames from 'classnames'
import { EPlayerType } from '../../../types/Game'
import { Fading } from '../../animations'
import { PlayerStatus } from '../../molecules'
import { Button } from '../../ui'
import { IControlsPanelProps } from './interfaces'
import './ControlsPanel.scss'

const ControlsPanel: FC<IControlsPanelProps> = ({ className, currentPlayer, winningState, resetGame, PlayerName }) => {
  const { isWon, player: wonPlayer } = winningState || {}
  const isCrossDisabled = (isWon ? wonPlayer : currentPlayer) !== EPlayerType.cross

  return (
    <section className={classNames(className, 'control-panel')}>
      <div className="control-panel-actions">
        <Fading isVisible={Boolean(isWon)}>
          <Button text="Начать заного" onClick={resetGame} className="fading-enter" />
        </Fading>
      </div>

      <div className="control-panel-player-statuses">
        <PlayerStatus
          isDisabled={isCrossDisabled}
          username={PlayerName[EPlayerType.cross]}
          type={EPlayerType.cross}
          shouldShowLoader={!isCrossDisabled && !isWon}
        />
        <PlayerStatus isDisabled={!isCrossDisabled} username={PlayerName[EPlayerType.circle]} type={EPlayerType.circle} modifier="right" />
      </div>
    </section>
  )
}

export default ControlsPanel
