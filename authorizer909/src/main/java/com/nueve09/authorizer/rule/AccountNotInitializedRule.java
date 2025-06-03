package com.nueve09.authorizer.rule;

import com.nueve09.authorizer.model.Account;

import java.util.List;

/**
 * Regla que verifica si no existe una cuenta inicializada.
 * Agrega una violación si se intenta procesar una transacción sin cuenta.
 */
public class AccountNotInitializedRule {
    public static final String VIOLATION_MESSAGE = "account-not-initialized"; // Mensaje de violación

    /**
     * Verifica si la cuenta no está inicializada.
     * @param account Cuenta actual, null si no existe.
     * @param violations Lista donde se agregan las violaciones detectadas.
     */
    public static void check(Account account, List<String> violations) {
        if (account == null) { // Si no hay cuenta, se agrega la violación
            violations.add(VIOLATION_MESSAGE);
        }
    }
}