"use client";

import { SnackbarProvider } from "notistack";
import { PaymentsRefreshProvider } from "@common/context/PaymentsRefreshContext";
import React from "react";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={3000}
    >
      <PaymentsRefreshProvider>{children}</PaymentsRefreshProvider>
    </SnackbarProvider>
  );
}
