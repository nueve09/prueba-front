import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonProps } from "./ButtonTypes";

export const Button = ({
  label,
  span,
  rotate90,
  icon,
  iconSize = "lg",
  bgColor,
  textColor,
  borderColor,
  type,
  width = "w-24",
  height = "h-24",
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`text-3xl flex justify-center items-center hover:opacity-70
        ${type === "square" ? "rounded" : "rounded-full"}
        ${span === "col" ? "w-full" : width}
        ${span === "row" ? "h-full flex justify-center items-center" : height} 
        ${bgColor ? bgColor : "bg-white"}
        ${textColor ? textColor : "text-black"}
        ${borderColor ? borderColor + " border-2 border-solid" : ""}
        ${className}`}
      onClick={onClick}
    >
      {icon ? (
        <FontAwesomeIcon
          icon={icon}
          size={iconSize}
          rotation={rotate90 ? 90 : undefined}
          className={`text-[${textColor}]`}
        />
      ) : (
        <b>{label}</b>
      )}
    </button>
  );
};
