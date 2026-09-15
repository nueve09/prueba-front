"use client";

import React from "react";

interface PaymentsRefreshValue {
  refreshKey: number;
  triggerRefresh: () => void;
}

const PaymentsRefreshContext = React.createContext<PaymentsRefreshValue>({
  refreshKey: 0,
  triggerRefresh: () => {},
});

export function PaymentsRefreshProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [refreshKey, setRefreshKey] = React.useState<number>(0);

  const triggerRefresh = React.useCallback(() => {
    setRefreshKey((previous) => previous + 1);
  }, []);

  const value = React.useMemo<PaymentsRefreshValue>(
    () => ({ refreshKey, triggerRefresh }),
    [refreshKey, triggerRefresh],
  );

  return (
    <PaymentsRefreshContext.Provider value={value}>
      {children}
    </PaymentsRefreshContext.Provider>
  );
}

export function usePaymentsRefresh() {
  return React.useContext(PaymentsRefreshContext);
}
