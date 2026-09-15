import {
  CHARGED_AT_COLUMN,
  COMPANY_COLUMN,
  EMPTY_STRING,
  PAYMENTS_TABLE,
  STATUS_COLUMN,
} from "@common/constants";
import { Payment, PaymentFilters } from "@common/interfaces";
import { supabase } from "@common/supabaseClient";
import { usePaymentsRefresh } from "@common/context/PaymentsRefreshContext";
import React, { useCallback, useEffect } from "react";

export default function usePayments(filters: PaymentFilters = {}) {
  const {
    id,
    company,
    amount,
    status,
    sortBy = CHARGED_AT_COLUMN,
    sortDirection = "asc",
  } = filters;

  const { refreshKey } = usePaymentsRefresh();

  const [payments, setPayments] = React.useState<Payment[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>(EMPTY_STRING);

  const fetchPayments = useCallback(async () => {
    setIsLoading(true);
    setError(EMPTY_STRING);

    let query = supabase.from(PAYMENTS_TABLE).select("*");

    if (company) {
      query = query.ilike(COMPANY_COLUMN, `%${company}%`);
    }

    if (status) {
      query = query.eq(STATUS_COLUMN, status);
    }

    query = query.order(sortBy, {
      ascending: sortDirection === "asc",
      nullsFirst: false,
    });

    // Secondary sort: COBRADO records first ("COBRADO" < "NO_COBRADO")
    if (sortBy !== STATUS_COLUMN) {
      query = query.order(STATUS_COLUMN, {
        ascending: true,
        nullsFirst: false,
      });
    }

    const { data, error } = await query.returns<Payment[]>();

    if (error) {
      setError(error.message);
      setPayments([]);
      setIsLoading(false);
      return;
    }

    let result = data ?? [];

    if (id) {
      result = result.filter((payment) => String(payment.id).includes(id));
    }

    if (amount) {
      result = result.filter((payment) =>
        String(payment.amount).includes(amount),
      );
    }

    setPayments(result);
    setIsLoading(false);
  }, [id, company, amount, status, sortBy, sortDirection]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPayments();
  }, [fetchPayments, refreshKey]);

  return {
    payments,
    isLoading,
    error,
    refetch: fetchPayments,
  };
}
