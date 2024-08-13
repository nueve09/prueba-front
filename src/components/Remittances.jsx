import Header from "../layout/Header";
// import remittances from "../data/data";
import RemittanceCard from "./RemittanceCard";
import { paginateData } from "../utils/pagination";
import { useState } from "react";
import Pagination from "./Pagination";

const Remittances = ({remittances, setFilter}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { remittencesInCurrentPage, lastPage, pagesInCurrentBlock } =
  paginateData(remittances, currentPage);
  return (
    <section className="w-full sm:p-12 px-4 pt-12 flex flex-col gap-3 h-screen sm:overflow-y-auto overflow-y-visible">
      <Header setFilter={setFilter} />
      {remittencesInCurrentPage.map((remittance) => (
        <RemittanceCard key={remittance.id} remittance={remittance} />
      ))}
      <Pagination
        lastPage={lastPage}
        pagesInCurrentBlock={pagesInCurrentBlock}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </section>
  );
};
export default Remittances;
