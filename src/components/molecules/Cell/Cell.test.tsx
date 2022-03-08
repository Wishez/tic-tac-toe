
import { render, screen } from '@testing-library/react';
import { EPlayerType, IBoardSize } from '../../../types/Game';
import { Cell as CellModel } from '../../../models'

import Cell from '.';

it('Отображение ячейки', () => {
  const BoardSize: IBoardSize = { x: 3, y: 3 }
  const chooseCell = jest.fn();
  render(<Cell cell={new CellModel(0, 0, BoardSize)} chooseCell={chooseCell} />);
  const cell = screen.getByRole('button')
  expect(cell).toBeInTheDocument();
  expect(cell?.querySelector('.player')).toBeNull()
});

it('Отображение ячейки с крестиком', () => {
  const chooseCell = jest.fn();
  const BoardSize: IBoardSize = { x: 3, y: 3 }
  const { container } = render(<Cell cell={new CellModel(1, 2, BoardSize, EPlayerType.cross)} chooseCell={chooseCell} />);
  const cell = container.querySelector('.cell')
  expect(cell).toBeInTheDocument();
  expect(cell?.querySelector('.player_cross')).toHaveClass('player_cross');
});

it('Отображение ячейки с ноликом', () => {
  const chooseCell = jest.fn();
  const BoardSize: IBoardSize = { x: 3, y: 3 }
  const { container } = render(<Cell cell={new CellModel(1, 2, BoardSize, EPlayerType.circle)} chooseCell={chooseCell} />);
  const cell = container.querySelector('.cell')
  expect(cell).toBeInTheDocument();
  expect(cell?.querySelector('.player_circle')).toHaveClass('player_circle');
})
