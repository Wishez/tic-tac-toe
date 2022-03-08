import { render } from "@testing-library/react"
import { EPlayerType, TGamePlayerName } from "../../../types/Game"
import ControlsPanel from "./ControlsPanel"

const PlayerName: TGamePlayerName = {
  [EPlayerType.cross]: "John",
  [EPlayerType.circle]: "Patrick"
}

test('Отображение компонента', () => {
  const resetGame = jest.fn()
  const { container } = render(<ControlsPanel resetGame={resetGame} PlayerName={PlayerName} currentPlayer={EPlayerType.cross}  />)

  expect(container.querySelector('.player-status.player-status_disabled > .player')).toHaveClass('player_circle')
  expect(container.querySelector('.control-panel-actions')?.childNodes.length).toBe(0)
})

test('Отображение компонента, когда игра закончилась', () => {
  const resetGame = jest.fn()
  const { container, getByText } = render(<ControlsPanel resetGame={resetGame} PlayerName={PlayerName} currentPlayer={EPlayerType.circle} winningState={{ isWon: true, player: EPlayerType.cross }} />)

  expect(container.querySelector('.player-status.player-status_disabled > .player')).toHaveClass('player_circle')
  expect(getByText('Начать заного')).toBeInTheDocument()
})