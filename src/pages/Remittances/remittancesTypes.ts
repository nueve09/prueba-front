export type Remittence = {
  id: number;
  company: string;
  amount: number;
  status: string;
  created_at: string;
  charged_at: string;
};

export type searchPropsTypes = {
  searchId: string;
  searchCompany: string;
  searchAmount: string;
};

export type PaginationProps = {
  previousPage: number | null;
  nextPage: number | null;
  total: number;
  totalPages: number;
  items: Remittence[];
};
