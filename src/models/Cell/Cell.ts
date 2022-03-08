import { EPlayerType, IBoardSize, ICellCoordinates, ICellIndexes } from '../../types/Game'
import { getIndexByCoordinate } from '../../utils/game/helpers'

export default class Cell {
  coordinates: Readonly<ICellCoordinates>

  indexes: Readonly<ICellIndexes>

  chosenByPlayerType?: EPlayerType

  constructor(y: number, x: number, BoardSize: IBoardSize, chosenByPlayerType?: EPlayerType) {
    this.coordinates = { y, x }
    this.chosenByPlayerType = chosenByPlayerType
    this.indexes = {
      row: getIndexByCoordinate(BoardSize.y + 1, y),
      cell: getIndexByCoordinate(BoardSize.x + 1, x),
    }
  }
}
