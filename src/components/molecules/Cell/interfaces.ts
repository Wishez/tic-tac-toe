import { Cell } from "../../../models";

export type TChooseCell = (cell: Cell) => void

export interface ICellProps {
  cell: Cell
  chooseCell: TChooseCell
}
