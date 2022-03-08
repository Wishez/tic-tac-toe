
import { render } from '@testing-library/react';
import GamePanel from './';
import { IBoardSize } from '../../../types/Game';
import { generateGameMap } from '../../../utils/game/helpers';

it('Отображение игровой панели панели', () => {
  const BoardSize: IBoardSize = { x: 2, y: 2 }
  render(<GamePanel gameMap={Object.values(generateGameMap(BoardSize))} chooseCell={() => {}} />);
});
