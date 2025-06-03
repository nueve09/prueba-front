package com.nueve09.authorizer.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.nueve09.authorizer.AuthorizerApp;
import com.nueve09.authorizer.model.Account;
import com.nueve09.authorizer.rule.AccountAlreadyInitializedRule;

import java.util.List;

/**
 * Servicio para procesar operaciones de creación de cuentas.
 * Aplica reglas de negocio y actualiza el estado de la cuenta si no hay violaciones.
 */
public class AccountService {

    private static final ObjectMapper objectMapper = new ObjectMapper(); // Instancia de Jackson para parseo JSON

    /**
     * Procesa una operación de creación de cuenta.
     * @param accountNode Nodo JSON con los datos de la cuenta.
     * @param outputJson Nodo JSON para la salida.
     * @param violations Lista donde se agregan las violaciones detectadas.
     */
    public static void processAccountOperation(JsonNode accountNode, ObjectNode outputJson, List<String> violations) {
        Account account = AuthorizerApp.getAccount();

        // Aplica la regla de cuenta ya inicializada
        AccountAlreadyInitializedRule.check(account, violations);

        if (violations.isEmpty()) {
            // Crea la cuenta si no hay violaciones
            try {
                account = objectMapper.treeToValue(accountNode, Account.class);
                AuthorizerApp.setAccount(account);
            } catch (Exception e) {
                // Manejo de errores para parseo JSON, aunque se asume que no ocurrirán
                e.printStackTrace();
            }
        }

        // Construye el JSON de salida con el estado de la cuenta y violaciones
        outputJson.set("account", (account != null) ? objectMapper.valueToTree(account) : objectMapper.createObjectNode());
        outputJson.putArray("violations").addAll(violations.stream().map(outputJson::textNode).collect(java.util.stream.Collectors.toList()));
    }
}