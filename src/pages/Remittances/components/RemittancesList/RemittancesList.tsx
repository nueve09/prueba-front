import { Fragment, ReactNode } from "react";
import { Remittence } from "../../remittancesTypes";
import { useAppSelector } from "../../../../redux/hooks";
import { currencyMask } from "../../../../utils/dataMasks";
import { PrevButton } from "../../../../components/Pagination/PrevButton";
import { NextButton } from "../../../../components/Pagination/NextButton";
import { usePaginationActions } from "../../../../hooks/usePaginationActions";

function RemittancesList() {
  const { changePagination } = usePaginationActions();
  const paginatedRemittances = useAppSelector(
    (state) => state.remittances.paginatedRemittances,
  );
  const pages: ReactNode[] = [];

  for (let index = 1; index <= paginatedRemittances.totalPages; index++) {
    pages.push(
      <li key={index}>
        <a
          onClick={() => {
            changePagination(index);
          }}
          className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-white font-bold bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          {index}
        </a>
      </li>,
    );
  }
  return (
    <>
      <div className="border-y-2 border-solid border-slate-400 my-4 max-h-[400px] lg:max-h-[450px] h-full overflow-scroll bg-scroll">
        {paginatedRemittances.items.map((remittance: Remittence) => {
          return (
            <Fragment key={remittance.id}>
              <>
                <hr className="border-0 h-px bg-[#CBD5E1]" />
                <div className="grid grid-cols-3 w-full gap-3 my-3 w-full">
                  <span>#{remittance.id}</span>
                  <span>{remittance.company}</span>
                  <span>{currencyMask(remittance.amount)}</span>
                </div>
              </>
            </Fragment>
          );
        })}
      </div>
      <div className="flex justify-center items-center">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-sm">
            <PrevButton
              onClick={() =>
                changePagination(
                  paginatedRemittances.previousPage
                    ? paginatedRemittances.previousPage
                    : 0,
                )
              }
            />
            {pages}
            <NextButton
              onClick={() =>
                changePagination(
                  paginatedRemittances.nextPage
                    ? paginatedRemittances.nextPage
                    : 0,
                )
              }
            />
          </ul>
        </nav>
      </div>
    </>
  );
}

export default RemittancesList;
