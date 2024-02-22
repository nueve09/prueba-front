import { Remittence } from "../pages/Remittances/remittancesTypes";
import { getDateNumber } from "./dateTime";

export const sortRemittences = (list: Array<Remittence>) => {
  return list.sort((a: Remittence, b: Remittence) => {
    if (a.charged_at === "") return 1;
    if (b.charged_at === "") return -1;
    if (a.charged_at === b.charged_at) return 0;
    return getDateNumber(a.charged_at) < getDateNumber(b.charged_at) ? 1 : -1;
  });
};

export const filterByStatus = (list: Array<Remittence>, status: string) => {
  return list.filter((remittance) => remittance.status === status);
};

export const getFilteredList = (
  list: Array<Remittence>,
  searchId: string,
  searchCompany: string,
  searchAmount: string,
) => {
  return list.filter((remittance) => {
    return (
      String(remittance.id).toLowerCase().includes(searchId) &&
      remittance.company.toLowerCase().includes(searchCompany) &&
      String(remittance.amount).toLowerCase().includes(searchAmount)
    );
  });
};

export const findElement = (list: Array<Remittence>, id: number) => {
  return list.find((remittance) => {
    return remittance.id === id;
  });
};
