package com.nueve09.authorizer.rule;

import com.nueve09.authorizer.model.Account;
import com.nueve09.authorizer.model.Transaction;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Regla que verifica si hay más de 3 transacciones en un intervalo de 2 minutos.
 * Agrega una violación si se excede el límite de frecuencia.
 */
public class HighFrequencySmallIntervalRule {
    public static final String VIOLATION_MESSAGE = "high-frequency-small-interval"; // Mensaje de violación
    private static final long TWO_MINUTES_IN_SECONDS = 120; // Intervalo de 2 minutos en segundos
    private static final int MAX_TRANSACTIONS = 3; // Máximo de transacciones permitidas

    /**
     * Verifica si hay demasiadas transacciones en un intervalo corto.
     * @param account Cuenta actual, null si no existe.
     * @param newTransaction Nueva transacción a validar.
     * @param transactionHistory Historial de transacciones.
     * @param violations Lista donde se agregan las violaciones detectadas.
     */
    public static void check(Account account, Transaction newTransaction, List<Transaction> transactionHistory, List<String> violations) {
        if (account == null || newTransaction == null) {
            return; // No se procesa si no hay cuenta o transacción
        }

        // Filtra transacciones en los últimos 2 minutos
        List<Transaction> recentTransactions = transactionHistory.stream()
                .filter(t -> Duration.between(t.getTime(), newTransaction.getTime()).getSeconds() < TWO_MINUTES_IN_SECONDS)
                .collect(Collectors.toList());

        if (recentTransactions.size() >= MAX_TRANSACTIONS) { // Si hay 3 o más transacciones
            violations.add(VIOLATION_MESSAGE);
        }
    }
}