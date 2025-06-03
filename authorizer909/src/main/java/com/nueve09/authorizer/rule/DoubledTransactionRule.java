package com.nueve09.authorizer.rule;

import com.nueve09.authorizer.model.Account;
import com.nueve09.authorizer.model.Transaction;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Regla que verifica si una transacción es duplicada (mismo comerciante y monto en menos de 2 minutos).
 * Agrega una violación si se detecta una transacción duplicada.
 */
public class DoubledTransactionRule {
    public static final String VIOLATION_MESSAGE = "doubled-transaction"; // Mensaje de violación
    private static final long TWO_MINUTES_IN_SECONDS = 120; // Intervalo de 2 minutos en segundos

    /**
     * Verifica si la nueva transacción es duplicada comparándola con el historial.
     * @param account Cuenta actual, null si no existe.
     * @param newTransaction Nueva transacción a validar.
     * @param transactionHistory Historial de transacciones.
     * @param violations Lista donde se agregan las violaciones detectadas.
     */
    public static void check(Account account, Transaction newTransaction, List<Transaction> transactionHistory, List<String> violations) {
        if (account == null || newTransaction == null) {
            return; // No se procesa si no hay cuenta o transacción
        }

        // Verifica transacciones similares en los últimos 2 minutos
        boolean hasDoubledTransaction = transactionHistory.stream()
                .filter(t -> Duration.between(t.getTime(), newTransaction.getTime()).getSeconds() < TWO_MINUTES_IN_SECONDS)
                .anyMatch(t -> t.getMerchant().equals(newTransaction.getMerchant()) && t.getAmount() == newTransaction.getAmount());

        if (hasDoubledTransaction) {
            violations.add(VIOLATION_MESSAGE);
        }
    }
}