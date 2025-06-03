package com.nueve09.authorizer.rule;

import com.nueve09.authorizer.model.Account;
import com.nueve09.authorizer.model.Transaction;

import java.util.List;

/**
 * Regla que verifica si el monto de una transacción excede el límite disponible.
 * Agrega una violación si el límite es insuficiente.
 */
public class InsufficientLimitRule {
    public static final String VIOLATION_MESSAGE = "insufficient-limit"; // Mensaje de violación

    /**
     * Verifica si el monto de la transacción excede el límite disponible.
     * @param account Cuenta actual, null si no existe.
     * @param transaction Transacción a validar.
     * @param violations Lista donde se agregan las violaciones detectadas.
     */
    public static void check(Account account, Transaction transaction, List<String> violations) {
        if (account != null && transaction != null && transaction.getAmount() > account.getAvailableLimit()) {
            violations.add(VIOLATION_MESSAGE);
        }
    }
}