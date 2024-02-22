const months: Array<string> = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const getTodayHuman = () => {
  const date: Date = new Date();
  return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
};

export const getDateNumber = (date: string) => {
  const formattedDate: string = `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}T00:00:00.000`;
  return new Date(formattedDate).getTime();
};

export const getTodayRemittence = () => {
  const date: Date = new Date();
  const monthNumber: string = String(date.getMonth());
  const month =
    monthNumber.length === 1 ? "0" + (+monthNumber + 1) : +monthNumber + 1;
  const dayNumber: string = String(date.getDate());
  const day = dayNumber.length === 1 ? "0" + +dayNumber : +dayNumber;
  return `${date.getFullYear()}${month}${day}`;
};
