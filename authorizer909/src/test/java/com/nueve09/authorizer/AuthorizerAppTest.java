package com.nueve09.authorizer;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.nueve09.authorizer.model.Account;
import com.nueve09.authorizer.model.Transaction;
import com.nueve09.authorizer.rule.*;
import com.nueve09.authorizer.service.AccountService;
import com.nueve09.authorizer.service.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

public class AuthorizerAppTest {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private Account account;
    private List<Transaction> transactionHistory;
    private List<String> violations;

    @BeforeEach
    void setUp() {
        AuthorizerApp.setAccount(null);
        AuthorizerApp.getTransactionHistory().clear();
        account = null;
        transactionHistory = new ArrayList<>();
        violations = new ArrayList<>();
    }

    @Test
    void testAccountAlreadyInitializedRule() {
        account = new Account(true, 100);
        AccountAlreadyInitializedRule.check(account, violations);
        assertEquals(List.of("account-already-initialized"), violations);
    }

    @Test
    void testAccountNotInitializedRule() {
        AccountNotInitializedRule.check(null, violations);
        assertEquals(List.of("account-not-initialized"), violations);
    }

    @Test
    void testCardNotActiveRule() {
        account = new Account(false, 100);
        CardNotActiveRule.check(account, violations);
        assertEquals(List.of("card-not-active"), violations);
    }

    @Test
    void testInsufficientLimitRule() {
        account = new Account(true, 50);
        Transaction transaction = new Transaction("Merchant", 100, Instant.now());
        InsufficientLimitRule.check(account, transaction, violations);
        assertEquals(List.of("insufficient-limit"), violations);
    }

    @Test
    void testHighFrequencySmallIntervalRule() {
        account = new Account(true, 1000);
        Instant baseTime = Instant.parse("2019-02-13T11:00:00.000Z");
        transactionHistory.add(new Transaction("M1", 10, baseTime));
        transactionHistory.add(new Transaction("M2", 10, baseTime.plusSeconds(1)));
        transactionHistory.add(new Transaction("M3", 10, baseTime.plusSeconds(2)));
        Transaction newTransaction = new Transaction("M4", 10, baseTime.plusSeconds(3));
        HighFrequencySmallIntervalRule.check(account, newTransaction, transactionHistory, violations);
        assertEquals(List.of("high-frequency-small-interval"), violations);
    }

    @Test
    void testDoubledTransactionRule() {
        account = new Account(true, 1000);
        Instant baseTime = Instant.parse("2019-02-13T11:00:00.000Z");
        transactionHistory.add(new Transaction("Burger King", 20, baseTime));
        Transaction newTransaction = new Transaction("Burger King", 20, baseTime.plusSeconds(30));
        DoubledTransactionRule.check(account, newTransaction, transactionHistory, violations);
        assertEquals(List.of("doubled-transaction"), violations);
    }

    @Test
    void testAccountCreationSuccess() {
        ObjectNode input = objectMapper.createObjectNode();
        input.putObject("account").put("active-card", true).put("available-limit", 100);
        ObjectNode output = objectMapper.createObjectNode();
        AccountService.processAccountOperation(input.get("account"), output, violations);
        assertEquals(true, output.get("account").get("active-card").asBoolean());
        assertEquals(100, output.get("account").get("available-limit").asInt());
        assertTrue(output.get("violations").isArray());
        assertTrue(output.get("violations").isEmpty());
    }

    @Test
    void testAccountAlreadyInitialized() {
        AuthorizerApp.setAccount(new Account(true, 100));
        ObjectNode input = objectMapper.createObjectNode();
        input.putObject("account").put("active-card", true).put("available-limit", 200);
        ObjectNode output = objectMapper.createObjectNode();
        AccountService.processAccountOperation(input.get("account"), output, violations);
        assertEquals(100, output.get("account").get("available-limit").asInt());
        assertEquals(List.of("account-already-initialized"), violations);
    }

    @Test
    void testTransactionSuccess() {
        AuthorizerApp.setAccount(new Account(true, 100));
        ObjectNode input = objectMapper.createObjectNode();
        input.putObject("transaction")
                .put("merchant", "Burger King")
                .put("amount", 20)
                .put("time", "2019-02-13T11:00:00.000Z");
        ObjectNode output = objectMapper.createObjectNode();
        TransactionService.processTransactionOperation(input.get("transaction"), output, violations);
        assertEquals(80, output.get("account").get("available-limit").asInt());
        assertTrue(output.get("violations").isEmpty());
        assertEquals(1, AuthorizerApp.getTransactionHistory().size());
    }

    @Test
    void testTransactionMultipleViolations() {
        AuthorizerApp.setAccount(new Account(true, 50));
        Instant baseTime = Instant.parse("2019-02-13T11:00:00.000Z");
        AuthorizerApp.getTransactionHistory().add(new Transaction("M1", 10, baseTime));
        AuthorizerApp.getTransactionHistory().add(new Transaction("M2", 10, baseTime.plusSeconds(1)));
        AuthorizerApp.getTransactionHistory().add(new Transaction("Burger King", 20, baseTime.plusSeconds(2)));
        ObjectNode input = objectMapper.createObjectNode();
        input.putObject("transaction")
                .put("merchant", "Burger King")
                .put("amount", 100)
                .put("time", baseTime.plusSeconds(3).toString());
        ObjectNode output = objectMapper.createObjectNode();
        TransactionService.processTransactionOperation(input.get("transaction"), output, violations);
        assertEquals(50, output.get("account").get("available-limit").asInt());
        assertTrue(violations.contains("insufficient-limit"));
        assertTrue(violations.contains("high-frequency-small-interval"));
        assertTrue(violations.contains("doubled-transaction"));
    }

    @Test
    void testSampleScenario() throws Exception {
        String[] inputs = {
                "{\"account\": {\"active-card\": true, \"available-limit\": 100}}",
                "{\"transaction\": {\"merchant\": \"Burger King\", \"amount\": 20, \"time\": \"2019-02-13T10:00:00.000Z\"}}",
                "{\"transaction\": {\"merchant\": \"Mabbib's\", \"amount\": 90, \"time\": \"2019-02-13T11:00:00.000Z\"}}",
                "{\"transaction\": {\"merchant\": \"McDonald's\", \"amount\": 30, \"time\": \"2019-02-13T12:00:00.000Z\"}}"
        };
        String[] expectedOutputs = {
                "{\"account\": {\"active-card\": true, \"available-limit\": 100}, \"violations\": []}",
                "{\"account\": {\"active-card\": true, \"available-limit\": 80}, \"violations\": []}",
                "{\"account\": {\"active-card\": true, \"available-limit\": 80}, \"violations\": [\"insufficient-limit\"]}",
                "{\"account\": {\"active-card\": true, \"available-limit\": 50}, \"violations\": []}"
        };

        for (int i = 0; i < inputs.length; i++) {
            JsonNode inputJson = objectMapper.readTree(inputs[i]);
            ObjectNode outputJson = objectMapper.createObjectNode();
            violations.clear();
            if (inputJson.has("account")) {
                AccountService.processAccountOperation(inputJson.get("account"), outputJson, violations);
            } else {
                TransactionService.processTransactionOperation(inputJson.get("transaction"), outputJson, violations);
            }
            assertEquals(expectedOutputs[i], outputJson.toString());
        }
    }
}


/****

package com.nueve09.authorizer;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.PrintStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class AuthorizerAppTest {

    private final InputStream originalIn = System.in;
    private final PrintStream originalOut = System.out;
    private ByteArrayOutputStream outputStreamCaptor;

    @Before
    public void setUp() {
        outputStreamCaptor = new ByteArrayOutputStream();
        System.setOut(new PrintStream(outputStreamCaptor));
    }

    @After
    public void tearDown() {
        System.setIn(originalIn);
        System.setOut(originalOut);
        // Reset the static state of AuthorizerApp for each test
        AuthorizerApp.setAccount(null);
        AuthorizerApp.getTransactionHistory().clear();
    }

    @Test
    public void testSampleUsage() throws UnsupportedEncodingException {
        String input = "{\"account\": {\"active-card\": true, \"available-limit\": 100}}\n" +
                       "{\"transaction\": {\"merchant\": \"Burger King\", \"amount\": 20, \"time\": \"2019-02-13T10:00:00.000Z\"}}\n" +
                       "{\"transaction\": {\"merchant\": \"Habbib's\", \"amount\": 90, \"time\": \"2019-02-13T11:00:00.000Z\"}}\n" +
                       "{\"transaction\": {\"merchant\": \"McDonald's\", \"amount\": 30, \"time\": \"2019-02-13T12:00:00.000Z\"}}";
        
        System.setIn(new ByteArrayInputStream(input.getBytes(StandardCharsets.UTF_8.name())));

        AuthorizerApp.main(new String[]{});

        String expectedOutput = "{\"account\":{\"active-card\":true,\"available-limit\":100},\"violations\":[]}\n" +
                                "{\"account\":{\"active-card\":true,\"available-limit\":80},\"violations\":[]}\n" +
                                "{\"account\":{\"active-card\":true,\"available-limit\":80},\"violations\":[\"insufficient-limit\"]}\n" +
                                "{\"account\":{\"active-card\":true,\"available-limit\":50},\"violations\":[]}";

        String actualOutput = outputStreamCaptor.toString(StandardCharsets.UTF_8.name()).trim();
        // Compare line by line because order of violations in output might vary if not explicitly sorted
        String[] actualLines = actualOutput.split("\n");
        String[] expectedLines = expectedOutput.split("\n");

        assertEquals(expectedLines.length, actualLines.length);
        for (int i = 0; i < expectedLines.length; i++) {
            assertEquals(expectedLines[i], actualLines[i]);
        }
    }

    @Test
    public void testAccountAlreadyInitializedViolation() throws UnsupportedEncodingException {
        String input = "{\"account\": {\"active-card\": true, \"available-limit\": 175}}\n" +
                       "{\"account\": {\"active-card\": true, \"available-limit\": 350}}";
        
        System.setIn(new ByteArrayInputStream(input.getBytes(StandardCharsets.UTF_8.name())));

        AuthorizerApp.main(new String[]{});

        String expectedOutput = "{\"account\":{\"active-card\":true,\"available-limit\":175},\"violations\":[]}\n" +
                                "{\"account\":{\"active-card\":true,\"available-limit\":175},\"violations\":[\"account-already-initialized\"]}";
        
        String actualOutput = outputStreamCaptor.toString(StandardCharsets.UTF_8.name()).trim();
        String[] actualLines = actualOutput.split("\n");
        String[] expectedLines = expectedOutput.split("\n");

        assertEquals(expectedLines.length, actualLines.length);
        for (int i = 0; i < expectedLines.length; i++) {
            assertEquals(expectedLines[i], actualLines[i]);
        }
    }
}
*/
