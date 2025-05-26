export const isValidRemittanceId = (id) => {
  return /^[0-9]{1,8}$/.test(id);
};

export const isUncharged = (remittance) => {
  return remittance.status === "NO_COBRADO" && (!remittance.charged_at || remittance.charged_at === "");
};