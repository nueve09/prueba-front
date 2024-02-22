import { PaginationButtonProps } from "./PaginationTypes";

export const NextButton = ({ onClick }: PaginationButtonProps) => {
  return (
    <li>
      <a
        onClick={onClick}
        className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-white font-bold bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        Siguiente
      </a>
    </li>
  );
};
