import { useEffect, useState } from 'react';

interface UsePaginationParams<D> {
  data: Array<D>;
  totalValuesPerPage: number;
}

export function usePagination<D>({
  data,
  totalValuesPerPage,
}: UsePaginationParams<D>) {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [dataToDisplay, setDataToDisplay] = useState(Array<D>);

  useEffect(() => {
    setDataToDisplay(data.slice(0, totalValuesPerPage));
  }, [data]);

  function goToPrevPage() {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  }

  function goToNextPage() {
    const totalPages = data.length / totalValuesPerPage;
    if (currentPageNumber >= totalPages) return;
    setCurrentPageNumber((prev) => prev + 1);
  }

  useEffect(() => {
    const start = (currentPageNumber - 1) * totalValuesPerPage;
    const end = currentPageNumber * totalValuesPerPage;
    setDataToDisplay(data.slice(start, end));
  }, [currentPageNumber]);

  return {
    dataToDisplay,
    goToPrevPage,
    goToNextPage,
  };
}
