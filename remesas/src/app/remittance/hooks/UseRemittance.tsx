import {
  EMPTY_STRING,
  FIRST_PAGE,
  QUERY_PARAM_PAGE,
  QUERY_PARAM_PER_PAGE,
  QUERY_PARAM_SEARCH,
  QUERY_PARAM_SORT_BY,
  QUERY_PARAM_SORT_DIRECTION,
  QUERY_PARAM_STATUS,
  SEARCH_DEBOUNCE_MS,
} from "@common/constants";
import usePayments from "@common/hooks/UsePayments";
import useDebounce from "@common/hooks/UseDebounce";
import useQueryParams from "@common/hooks/UseQueryParams";
import {
  PaymentSortField,
  PaymentStatus,
  SortDirection,
} from "@common/interfaces";
import { PaymentRow } from "@remittance/interfaces";
import React from "react";

export default function useRemittance() {
  const { getParam, setParams } = useQueryParams();

  const [search, setSearch] = React.useState<string>(() =>
    getParam(QUERY_PARAM_SEARCH),
  );
  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_MS);
  const [status, setStatus] = React.useState<PaymentStatus | undefined>(
    () => (getParam(QUERY_PARAM_STATUS) as PaymentStatus) || undefined,
  );
  const [sortBy, setSortBy] = React.useState<PaymentSortField>(
    () => (getParam(QUERY_PARAM_SORT_BY) as PaymentSortField) || "charged_at",
  );
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(
    () => (getParam(QUERY_PARAM_SORT_DIRECTION) as SortDirection) || "asc",
  );
  const [page, setPage] = React.useState<number>(
    () => Number(getParam(QUERY_PARAM_PAGE)) || FIRST_PAGE,
  );
  const [perPage, setPerPage] = React.useState<number>(
    () => Number(getParam(QUERY_PARAM_PER_PAGE)) || 5,
  );

  const { payments, isLoading, error } = usePayments({
    status,
    sortBy,
    sortDirection,
  });

  const rows = React.useMemo<PaymentRow[]>(
    () =>
      payments.map((payment) => ({
        id: payment.id,
        identifier: { value: payment.id, adornment: "#" },
        company: { value: payment.company, adornment: EMPTY_STRING },
        amount: { value: payment.amount, adornment: "$" },
        status: { value: payment.status, adornment: EMPTY_STRING },
        created_at: { value: payment.created_at, adornment: EMPTY_STRING },
        charged_at: {
          value: payment.charged_at ?? EMPTY_STRING,
          adornment: EMPTY_STRING,
        },
      })),
    [payments],
  );

  const filteredRows = React.useMemo<PaymentRow[]>(() => {
    const term = debouncedSearch.trim().toLowerCase();
    if (!term) {
      return rows;
    }
    return rows.filter((row) => {
      const id = String(row.identifier.value).toLowerCase();
      const company = String(row.company.value).toLowerCase();
      const amount = String(row.amount.value).toLowerCase();
      return (
        id.includes(term) ||
        company.includes(term) ||
        amount.includes(term)
      );
    });
  }, [rows, debouncedSearch]);

  const totalPages = Math.max(
    FIRST_PAGE,
    Math.ceil(filteredRows.length / perPage),
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedRows = React.useMemo<PaymentRow[]>(() => {
    const start = (currentPage - 1) * perPage;
    return filteredRows.slice(start, start + perPage);
  }, [filteredRows, currentPage, perPage]);

  React.useEffect(() => {
    setParams({
      [QUERY_PARAM_SEARCH]: debouncedSearch.trim(),
      [QUERY_PARAM_STATUS]: status ?? EMPTY_STRING,
      [QUERY_PARAM_SORT_BY]: sortBy,
      [QUERY_PARAM_SORT_DIRECTION]: sortDirection,
      [QUERY_PARAM_PER_PAGE]: String(perPage),
      [QUERY_PARAM_PAGE]: String(currentPage),
    });
  }, [
    debouncedSearch,
    status,
    sortBy,
    sortDirection,
    perPage,
    currentPage,
    setParams,
  ]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  React.useEffect(() => {
    setPage(FIRST_PAGE);
  }, [debouncedSearch]);

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    setStatus(value ? (value as PaymentStatus) : undefined);
    setPage(FIRST_PAGE);
  };

  const handleSort = (attribute: string) => {
    const field = attribute as PaymentSortField;
    if (field === sortBy) {
      setSortDirection((previous) => (previous === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const handlePerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPerPage(Number(event.target.value));
    setPage(FIRST_PAGE);
  };

  const handlePreviousPage = () => {
    setPage((previous) => Math.max(FIRST_PAGE, previous - 1));
  };

  const handleNextPage = () => {
    setPage((previous) => Math.min(totalPages, previous + 1));
  };

  return {
    rows: paginatedRows,
    isLoading,
    error,
    search,
    status,
    sortBy,
    sortDirection,
    perPage,
    currentPage,
    totalPages,
    handleSearchChange,
    handleStatusChange,
    handleSort,
    handlePerPageChange,
    handlePreviousPage,
    handleNextPage,
  };
}
