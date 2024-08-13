const Pagination = ({
  lastPage,
  pagesInCurrentBlock,
  setCurrentPage,
  currentPage,
}) => {
  const handleFirstPage = () => {
    setCurrentPage(1);
  };
  const handleLastPage = () => {
    setCurrentPage(lastPage);
  };
  const handleNextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <ul className="pb-8 text-3xl flex gap-2 justify-center font-semibold flex-wrap">
      <li>
        <button
          onClick={handleFirstPage}
          className="h-[80px] aspect-square rounded-full hover:bg-secondary-blue/40 hover:text-white"
        >
          {"<<"}
        </button>
      </li>
      <li>
        <button onClick={handlePreviousPage} className="h-[80px] aspect-square rounded-full hover:bg-secondary-blue/40 hover:text-white">
          {"<"}
        </button>
      </li>
      {pagesInCurrentBlock.map((page) => (
        <li key={page}>
          <button
            onClick={() => setCurrentPage(page)}
            className={`h-[80px] aspect-square rounded-full hover:bg-secondary-blue/40 hover:text-white ${
              page == currentPage ? "bg-secondary-blue text-white" : "bg-white"
            }`}
          >
            {page}
          </button>
        </li>
      ))}
      <li>
        <button onClick={handleNextPage} className="h-[80px] aspect-square rounded-full hover:bg-secondary-blue/40 hover:text-white">
          {">"}
        </button>
      </li>
      <li>
        <button
          onClick={handleLastPage}
          className="h-[80px] aspect-square rounded-full hover:bg-secondary-blue/40 hover:text-white"
        >
          {">>"}
        </button>
      </li>
    </ul>
  );
};
export default Pagination;
