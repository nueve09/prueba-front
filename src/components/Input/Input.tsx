import { InputProps } from "./InputTypes";

export const Input = ({
  className,
  calculatorInput,
  value,
  label,
  onChange,
}: InputProps) => {
  return (
    <>
      {calculatorInput ? (
        <div className="relative">
          <input
            type="text"
            maxLength={8}
            value={value}
            onChange={onChange}
            className="w-full h-16 bg-white rounded-lg text-black font-bold text-3xl px-10 text-center"
          />
          <span className="absolute font-bold text-3xl left-3 top-[12px] text-black">
            |
          </span>
          <span className="absolute font-bold text-3xl left-5 top-[19px] text-black">
            **
          </span>
        </div>
      ) : (
        <div className="relative">
          <label className="absolute text-xs top-[2px] left-[0]">
            <b>{label}</b>
          </label>
          <input
            type="text"
            className={`mt-5 h-10 w-full text-lg font-semibold ${className}`}
            onChange={onChange}
          />
        </div>
      )}
    </>
  );
};
