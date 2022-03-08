import { render } from "@testing-library/react"
import { EPlayerType } from "../../../types/Game"
import PlayerStatus from "./PlayerStatus"

test('Отображение статуса', () => {
  const username = 'shiningfinger'
  const { container, getByText } = render(<PlayerStatus type={EPlayerType.circle} username={username} />)
  const status = container.querySelector('.player-status')
  expect(status).toHaveClass('player-status')
  expect(status).toHaveClass('player-status_left')
  expect(getByText(username)).toHaveClass('player-status__title')
  expect(status?.querySelector('.player')).toHaveClass('player_circle')
})

test('Отображение статуса с загрузкой', () => {
  const username = 'Great'
  const { container } = render(<PlayerStatus type={EPlayerType.cross} username={username} shouldShowLoader />)

  expect(container.querySelector('.player-status__loader')).toBeInTheDocument()
})