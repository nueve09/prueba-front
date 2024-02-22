import { ModuleHeaderProps } from "./ModuleHeaderTypes";

export const ModuleHeader = ({ title }: ModuleHeaderProps) => {
  return (
    <div className="py-8 px-9 w-full">
      Ventanilla <b>Digital</b>
      <hr className="border-0 h-px bg-[#53cedf] my-4" />
      <h1 className="font-bold text-4xl text-[#53cedf]">{title}</h1>
    </div>
  );
};
