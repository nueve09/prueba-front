package com.nueve09.authorizer.rule;

import com.nueve09.authorizer.model.Account;

import java.util.List;

/**
 * Regla que verifica si la tarjeta de la cuenta está activa.
 * Agrega una violación si la tarjeta no está activa.
 */
public class CardNotActiveRule {
    public static final String VIOLATION_MESSAGE = "card-not-active"; // Mensaje de violación

    /**
     * Verifica si la tarjeta está activa.
     * @param account Cuenta actual, null si no existe.
     * @param violations Lista donde se agregan las violaciones detectadas.
     */
    public static void check(Account account, List<String> violations) {
        if (account != null && !account.isActiveCard()) { // Si la cuenta existe y la tarjeta no está activa
            violations.add(VIOLATION_MESSAGE);
        }
    }
}