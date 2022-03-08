import { TGameRow } from "../../../types/Game"
import { TChooseCell } from "../../molecules/Cell/interfaces"

export interface IGamePanelProps {
  gameMap: TGameRow[]
  chooseCell: TChooseCell
}

export interface IGamePanelRowProps {
  row: TGameRow
  chooseCell: TChooseCell
}
