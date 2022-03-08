import { EColor } from "../../../styles/EColor";

export interface ILoaderProps {
  wrapperClass?: string,
  color?: EColor,
  strokeWidth?: string | number,
  height?: string | number,
  width?: string | number,
  ariaLabel?: string,
  isVisible?: boolean
}
