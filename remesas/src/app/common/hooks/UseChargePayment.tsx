import {
  CHARGED_AT_COLUMN,
  EMPTY_STRING,
  ID_COLUMN,
  PAYMENTS_TABLE,
  STATUS_COBRADO,
  STATUS_COLUMN,
  STATUS_NO_COBRADO,
} from "@common/constants";
import { supabase } from "@common/supabaseClient";
import { Payment } from "@common/interfaces";
import { usePaymentsRefresh } from "@common/context/PaymentsRefreshContext";
import { useSnackbar } from "notistack";
import React from "react";

export default function useChargePayment() {
  const { enqueueSnackbar } = useSnackbar();
  const { triggerRefresh } = usePaymentsRefresh();
  const [isCharging, setIsCharging] = React.useState<boolean>(false);

  const chargePayment = React.useCallback(
    async (id: string) => {
      if (!id) {
        return;
      }

      setIsCharging(true);

      const { data, error } = await supabase
        .from(PAYMENTS_TABLE)
        .select("*")
        .eq(ID_COLUMN, id)
        .maybeSingle<Payment>();

      if (error) {
        enqueueSnackbar(error.message, { variant: "error" });
        setIsCharging(false);
        return;
      }

      if (!data) {
        enqueueSnackbar(`No se encontró la remesa #${id}`, {
          variant: "error",
        });
        setIsCharging(false);
        return;
      }

      if (data.status === STATUS_COBRADO) {
        enqueueSnackbar(`La remesa #${id} ya está cobrada`, {
          variant: "warning",
        });
        setIsCharging(false);
        return;
      }

      const { error: updateError } = await supabase
        .from(PAYMENTS_TABLE)
        .update({
          [STATUS_COLUMN]: STATUS_COBRADO,
          [CHARGED_AT_COLUMN]: new Date().toISOString(),
        })
        .eq(ID_COLUMN, id)
        .eq(STATUS_COLUMN, STATUS_NO_COBRADO);

      if (updateError) {
        enqueueSnackbar(updateError.message, { variant: "error" });
        setIsCharging(false);
        return;
      }

      enqueueSnackbar(`Remesa #${id} cobrada correctamente`, {
        variant: "success",
      });
      triggerRefresh();
      setIsCharging(false);
    },
    [enqueueSnackbar, triggerRefresh],
  );

  return {
    chargePayment,
    isCharging,
  };
}
