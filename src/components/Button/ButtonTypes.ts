import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { MouseEventHandler } from "react";

export type ButtonProps = {
  label?: string;
  span?: string;
  rotate90?: boolean;
  icon?: IconProp;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  type?: string;
  size?: string;
  iconSize?: SizeProp;
  className?: string;
  width?: string;
  height?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};
