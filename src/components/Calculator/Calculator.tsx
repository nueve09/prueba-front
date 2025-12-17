"use client";

import { useState, useCallback } from "react";
import { useError } from "@/src/context/errorContext";
import { validateIdFormat, findRemesaById } from "@/src/utils/validators";
import { useRemesas } from "@/src/hooks/useRemesas";
import styles from "./Calculator.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

export default function Calculator() {
  const [input, setInput] = useState<string>("");
  const { setError } = useError();
  const { chargeRemesa, allRemesas } = useRemesas();

  /**
   * @param char
   */
  const handleNumberClick = useCallback((char: string) => {
    setInput((prev) => {
      const newInput = prev + char;
      // Validar máximo 8 caracteres
      if (newInput.length > 8) {
        setError("El ID no puede exceder 8 caracteres");
        return prev;
      }
      return newInput;
    });
  }, [setError]);

  /**
   * @param e
   */
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // Convertir a mayúsculas
    // Validar máximo 8 caracteres y solo alfanuméricos
    if (value.length > 8) {
      setError("El ID no puede exceder 8 caracteres");
      return;
    }
    // Permitir solo caracteres alfanuméricos
    if (value && !/^[A-Z0-9]*$/.test(value)) {
      setError("El ID solo puede contener letras y números");
      return;
    }
    setInput(value);
  }, [setError]);

  const handleBackspace = useCallback(() => {
    setInput((prev) => prev.slice(0, -1));
  }, []);

  const handleClear = useCallback(() => {
    setInput("");
  }, []);

  const handleSubmit = useCallback(() => {
    const trimmedInput = input.trim().toUpperCase();

    // Validar que no esté vacío
    if (!trimmedInput) {
      setError("Por favor ingrese un ID");
      return;
    }

    // Validar formato del ID
    if (!validateIdFormat(trimmedInput)) {
      setError("El ID debe tener entre 1 y 8 caracteres");
      return;
    }

    // Buscar la remesa en los datos
    const remesa = findRemesaById(trimmedInput, allRemesas);

    if (!remesa) {
      setError(`No se encontró una remesa con ID: ${trimmedInput}`);
      setInput("");
      return;
    }

    // Validar que el status sea NO_COBRADO
    if (remesa.status === "COBRADO") {
      setError(`La remesa ${trimmedInput} ya fue cobrada anteriormente`);
      setInput("");
      return;
    }

    // Intentar cobrar la remesa (cambiar status de NO_COBRADO a COBRADO)
    const success = chargeRemesa(trimmedInput);

    if (success) {
      // Éxito: limpiar errores y input
      setError(null);
      setInput("");
      // La tabla se actualizará automáticamente porque el hook actualiza el estado
    } else {
      setError(`Error al procesar el cobro de la remesa ${trimmedInput}`);
      setInput("");
    }
  }, [input, setError, chargeRemesa, allRemesas]);

  return (
    <div className={styles.calculator}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className={styles.input}
          maxLength={8}
          aria-label="ID de remesa"
          placeholder="Ingrese ID"
        />
        <div className={styles.maskedDisplay}>
          {input}
        </div>
      </div>

      <div className={styles.keypad}>
      <button
            onClick={() => handleNumberClick("1")}
            className={`${styles.key} ${styles.one}`}
            aria-label="1"
          >
            1
          </button>
          <button
            onClick={() => handleNumberClick("2")}
            className={`${styles.key} ${styles.two}`}
            aria-label="2"
          >
            2
          </button>
          <button
            onClick={() => handleNumberClick("3")}
            className={`${styles.key} ${styles.three}`}
            aria-label="3"
          >
            3
          </button>
          <button
            onClick={handleBackspace}
            className={`${styles.key} ${styles.deleteButton} ${styles.btnSelectors} ${styles.delete}`}
            aria-label="Borrar"
          >
            <FontAwesomeIcon icon={faDeleteLeft} />
          </button>
          <button
            onClick={() => handleNumberClick("4")}
            className={`${styles.key} ${styles.four}`}
            aria-label="4"
          >
            4
          </button>
          <button
            onClick={() => handleNumberClick("5")}
            className={`${styles.key} ${styles.five}`}
            aria-label="5"
          >
            5
          </button>
          <button
            onClick={() => handleNumberClick("6")}
            className={`${styles.key} ${styles.six}`}
            aria-label="6"
          >
            6
          </button>
          <button
            onClick={() => handleNumberClick("7")}
            className={`${styles.key} ${styles.seven}`}
            aria-label="7"
          >
            7
          </button>
          <button
            onClick={() => handleNumberClick("8")}
            className={`${styles.key} ${styles.eight}`}
            aria-label="8"
          >
            8
          </button>
          <button
            onClick={() => handleNumberClick("9")}
            className={`${styles.key} ${styles.nine}`}
            aria-label="9"
          >
            9
          </button>
      <button
        onClick={handleSubmit}
        className={`${styles.confirmButton} ${styles.confirm}  ${styles.btnSelectors}`}
        aria-label="Confirmar"
      >
        <FontAwesomeIcon icon={faArrowTurnUp} rotation={270} />
      </button>
      <button
        onClick={() => handleNumberClick("0")}
        className={`${styles.key} ${styles.zeroButton} ${styles.zero}`}
        aria-label="0"
      >
        0
      </button>
      <button
        onClick={handleClear}
        className={`${styles.key} ${styles.dotButton} ${styles.dot}  ${styles.btnSelectors}`}
        aria-label="Punto"
      >
        .
      </button>
      </div>
    </div>
  );
}

