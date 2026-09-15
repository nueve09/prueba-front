export const EMPTY_STRING = "";
export const MIN_ID_LENGTH = 0;
export const MAX_ID_LENGTH = 8;

export const PAYMENTS_TABLE = "payments";
export const ID_COLUMN = "id";
export const COMPANY_COLUMN = "company";
export const AMOUNT_COLUMN = "amount";
export const STATUS_COLUMN = "status";
export const CREATED_AT_COLUMN = "created_at";
export const CHARGED_AT_COLUMN = "charged_at";

export const STATUS_COBRADO = "COBRADO";
export const STATUS_NO_COBRADO = "NO_COBRADO";

export const PER_PAGE_OPTIONS = [5, 10, 20, 50];
export const FIRST_PAGE = 1;
export const SEARCH_DEBOUNCE_MS = 300;

export const QUERY_PARAM_SEARCH = "search";
export const QUERY_PARAM_STATUS = "status";
export const QUERY_PARAM_SORT_BY = "sortBy";
export const QUERY_PARAM_SORT_DIRECTION = "sortDirection";
export const QUERY_PARAM_PER_PAGE = "perPage";
export const QUERY_PARAM_PAGE = "page";

export const DATE_LOCALE = "es-ES";

export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
};
