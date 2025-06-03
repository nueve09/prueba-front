package com.nueve09.authorizer;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.nueve09.authorizer.model.Account;
import com.nueve09.authorizer.model.Transaction;
import com.nueve09.authorizer.service.AccountService;
import com.nueve09.authorizer.service.TransactionService;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Clase principal de la aplicación Autorizador.
 * Lee operaciones JSON desde stdin, las procesa y genera resultados en stdout.
 * Mantiene el estado de la cuenta y el historial de transacciones en memoria.
 */
public class AuthorizerApp {

    private static Account account; // Estado en memoria de la cuenta
    private static List<Transaction> transactionHistory; // Historial de transacciones en memoria

    /**
     * Punto de entrada de la aplicación.
     * Procesa líneas JSON desde stdin y genera resultados en stdout.
     * @param args Argumentos de línea de comandos (no utilizados).
     */
    public static void main(String[] args) {
        account = null; // Reinicia el estado de la cuenta al inicio
        transactionHistory = new ArrayList<>(); // Reinicia el historial de transacciones
        ObjectMapper objectMapper = new ObjectMapper();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(System.in))) {
            String line;
            while ((line = reader.readLine()) != null) {
                JsonNode inputJson = objectMapper.readTree(line);
                ObjectNode outputJson = objectMapper.createObjectNode();
                List<String> violations = new ArrayList<>();

                if (inputJson.has("account")) {
                    // Procesa operación de creación de cuenta
                    AccountService.processAccountOperation(inputJson.get("account"), outputJson, violations);
                } else if (inputJson.has("transaction")) {
                    // Procesa operación de autorización de transacción
                    TransactionService.processTransactionOperation(inputJson.get("transaction"), outputJson, violations);
                }

                System.out.println(outputJson.toString());
            }
        } catch (IOException e) {
            // Manejo de errores para entrada/salida, aunque se asume que no ocurrirán
            e.printStackTrace();
        }
    }

    /**
     * Obtiene la cuenta actual.
     * @return Cuenta actual, null si no existe.
     */
    public static Account getAccount() {
        return account;
    }

    /**
     * Establece la cuenta actual.
     * @param currentAccount Nueva cuenta.
     */
    public static void setAccount(Account currentAccount) {
        account = currentAccount;
    }

    /**
     * Obtiene el historial de transacciones.
     * @return Lista de transacciones.
     */
    public static List<Transaction> getTransactionHistory() {
        return transactionHistory;
    }

    /**
     * Agrega una transacción al historial.
     * @param transaction Transacción a agregar.
     */
    public static void addTransactionToHistory(Transaction transaction) {
        transactionHistory.add(transaction);
    }
}