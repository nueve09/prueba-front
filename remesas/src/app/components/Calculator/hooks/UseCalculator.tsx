import { EMPTY_STRING, MAX_ID_LENGTH, MIN_ID_LENGTH } from "@common/constants";
import { notDigit } from "@common/regex";
import useChargePayment from "@common/hooks/UseChargePayment";
import React from "react";

const PAD_KEYS: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default function useCalculator() {
  const [inputValue, setInputValue] = React.useState<string>(EMPTY_STRING);
  const { chargePayment, isCharging } = useChargePayment();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(notDigit, EMPTY_STRING);
    setInputValue(numericValue.slice(MIN_ID_LENGTH, MAX_ID_LENGTH));
  };

  const handlePadClick = (key: string) => {
    setInputValue((previousValue) =>
      (previousValue + key).slice(MIN_ID_LENGTH, MAX_ID_LENGTH),
    );
  };

  const handleBackspace = () => {
    setInputValue((previousValue) =>
      previousValue.slice(MIN_ID_LENGTH, previousValue.length - 1),
    );
  };

  const handleSubmit = async () => {
    await chargePayment(inputValue);
    setInputValue(EMPTY_STRING);
  };

  return {
    inputValue,
    isCharging,
    handleInputChange,
    handlePadClick,
    handleBackspace,
    handleSubmit,
    PAD_KEYS,
  };
}
