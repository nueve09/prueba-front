const paginateData = (remittences, currentPage) => {
    // Cantidad de remittences por pagina
    const REMITTENCES_PER_PAGE = 10;
    // Remittences que se renderizan en la pagina actual
    const sliceEnd = currentPage * REMITTENCES_PER_PAGE;
    const sliceStart = sliceEnd - REMITTENCES_PER_PAGE;
    const remittencesInCurrentPage = remittences.slice(sliceStart, sliceEnd);
    //Cantidad de paginas o ultima pagina
    const lastPage = Math.ceil(remittences.length / REMITTENCES_PER_PAGE);
    const PAGES_PER_BLOCK = 3;
    // Bloque actual
    const currentBlock = Math.ceil(currentPage / PAGES_PER_BLOCK);
    //Paginas que se van a mostrar en el bloque actual
    const pagesInCurrentBlock = [];
    const lastBlockPage = currentBlock * PAGES_PER_BLOCK;
    const firstBlockPage = lastBlockPage - PAGES_PER_BLOCK + 1;
    for (
      let page = firstBlockPage;
      page <= Math.min(lastBlockPage, lastPage);
      page++
    ) {
      pagesInCurrentBlock.push(page);
    }
    return {
      remittencesInCurrentPage,
      lastPage,
      pagesInCurrentBlock,
    }
  };
  
  
  export { paginateData };
  