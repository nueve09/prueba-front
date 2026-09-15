import { DATE_LOCALE, DATE_OPTIONS } from "@common/constants";
import React from "react";

export default function useFormattedDate(date: Date = new Date()) {
  const formattedDate = React.useMemo(
    () => new Intl.DateTimeFormat(DATE_LOCALE, DATE_OPTIONS).format(date),
    [date],
  );

  return { formattedDate };
}
