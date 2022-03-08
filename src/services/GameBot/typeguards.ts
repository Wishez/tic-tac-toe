import { ICellCoordinates } from '../../types/Game'

export const isCellCoordinates = (coordinates: unknown): coordinates is ICellCoordinates =>
  typeof coordinates === 'object' && typeof (coordinates as ICellCoordinates).x === 'number'
