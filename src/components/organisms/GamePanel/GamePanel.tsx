import { FC, memo } from 'react'
import { Cell } from '../../molecules'
import { IGamePanelProps, IGamePanelRowProps } from './interfaces'
import './GamePanel.scss'

const GamePanelRow: FC<IGamePanelRowProps> = memo(({ row, chooseCell }) => (
  <div className="game-panel-row">
    {row.map(cell => (
      <Cell key={`${cell.coordinates.y}_${cell.coordinates.x}`} cell={cell} chooseCell={chooseCell} />
    ))}
  </div>
))

const GamePanel: FC<IGamePanelProps> = ({ gameMap, chooseCell }) => (
  <div className="game-panel">
    {gameMap.map((row, index) => (
      <GamePanelRow key={index + 1} row={row} chooseCell={chooseCell} />
    ))}
  </div>
)

export default memo(GamePanel)
