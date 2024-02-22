import { PaginationButtonProps } from "./PaginationTypes";

export const PrevButton = ({ onClick }: PaginationButtonProps) => {
  return (
    <li>
      <a
        onClick={onClick}
        className="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white font-bold bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        Anterior
      </a>
    </li>
  );
};
