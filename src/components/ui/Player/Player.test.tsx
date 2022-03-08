
import { render } from '@testing-library/react';
import { EPlayerType } from '../../../types/Game';
import Player from '.';

it('Отображение крестика', () => {
  const { container } = render(<Player type={EPlayerType.cross} />);
  const player = container.querySelector('.player_cross')
  expect(player).toBeInTheDocument()
  expect(player).toHaveClass('player_cross');
});

it('Отображение нолика', () => {
  const { container } = render(<Player type={EPlayerType.circle} />);
  const player = container.querySelector('.player_circle')
  expect(player).toBeInTheDocument()
  expect(player).toHaveClass('player_circle');
});