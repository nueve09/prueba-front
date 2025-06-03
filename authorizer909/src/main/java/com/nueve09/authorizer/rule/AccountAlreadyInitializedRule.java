package com.nueve09.authorizer.rule;

import com.nueve09.authorizer.model.Account;

import java.util.List;

/**
 * Regla que verifica si ya existe una cuenta inicializada.
 * Agrega una violación si se intenta crear una cuenta cuando ya existe una.
 */
public class AccountAlreadyInitializedRule {
    public static final String VIOLATION_MESSAGE = "account-already-initialized"; // Mensaje de violación

    /**
     * Verifica si la cuenta ya está inicializada.
     * @param account Cuenta actual, null si no existe.
     * @param violations Lista donde se agregan las violaciones detectadas.
     */
    public static void check(Account account, List<String> violations) {
        if (account != null) { // Si la cuenta existe, se considera inicializada
            violations.add(VIOLATION_MESSAGE);
        }
    }
}