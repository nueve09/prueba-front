package com.nueve09.authorizer.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.nueve09.authorizer.AuthorizerApp;
import com.nueve09.authorizer.model.Account;
import com.nueve09.authorizer.model.Transaction;
import com.nueve09.authorizer.rule.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para procesar operaciones de autorización de transacciones.
 * Aplica reglas de negocio y actualiza el estado si no hay violaciones.
 */
public class TransactionService {

    private static final ObjectMapper objectMapper = new ObjectMapper(); // Instancia de Jackson para parseo JSON

    /**
     * Procesa una operación de autorización de transacción.
     * @param transactionNode Nodo JSON con los datos de la transacción.
     * @param outputJson Nodo JSON para la salida.
     * @param violations Lista donde se agregan las violaciones detectadas.
     */
    public static void processTransactionOperation(JsonNode transactionNode, ObjectNode outputJson, List<String> violations) {
        Account currentAccount = AuthorizerApp.getAccount();
        List<Transaction> transactionHistory = AuthorizerApp.getTransactionHistory();
        Transaction newTransaction = null;

        // Parsea los datos de la transacción desde el JSON
        try {
            String merchant = transactionNode.get("merchant").asText();
            int amount = transactionNode.get("amount").asInt();
            Instant time = Instant.parse(transactionNode.get("time").asText());
            newTransaction = new Transaction(merchant, amount, time);
        } catch (Exception e) {
            // Manejo de errores para parseo JSON, aunque se asume que no ocurrirán
            e.printStackTrace();
        }

        // Aplica todas las reglas de negocio
        AccountNotInitializedRule.check(currentAccount, violations);
        CardNotActiveRule.check(currentAccount, violations);
        InsufficientLimitRule.check(currentAccount, newTransaction, violations);
        HighFrequencySmallIntervalRule.check(currentAccount, newTransaction, transactionHistory, violations);
        DoubledTransactionRule.check(currentAccount, newTransaction, transactionHistory, violations);

        if (violations.isEmpty()) {
            // Si no hay violaciones, descuenta el monto del límite y agrega la transacción al historial
            if (currentAccount != null) {
                currentAccount.setAvailableLimit(currentAccount.getAvailableLimit() - newTransaction.getAmount());
            }
            AuthorizerApp.addTransactionToHistory(newTransaction);
        }

        // Construye el JSON de salida con el estado de la cuenta y violaciones
        outputJson.set("account", (currentAccount != null) ? objectMapper.valueToTree(currentAccount) : objectMapper.createObjectNode());
        outputJson.putArray("violations").addAll(violations.stream().map(outputJson::textNode).collect(java.util.stream.Collectors.toList()));
    }
}