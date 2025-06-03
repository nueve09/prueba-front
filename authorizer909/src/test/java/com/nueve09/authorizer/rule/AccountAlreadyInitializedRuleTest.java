package com.nueve09.authorizer.rule;

import com.nueve09.authorizer.model.Account;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;

public class AccountAlreadyInitializedRuleTest {

    private List<String> violations;

    @Before
    public void setUp() {
        violations = new ArrayList<>();
    }

    @Test
    public void testNoViolationWhenAccountIsNull() {
        AccountAlreadyInitializedRule.check(null, violations);
        assertTrue(violations.isEmpty());
    }

    @Test
    public void testViolationWhenAccountIsNotNull() {
        Account account = new Account(true, 100);
        AccountAlreadyInitializedRule.check(account, violations);
        assertFalse(violations.isEmpty());
        assertEquals(1, violations.size());
        assertTrue(violations.contains(AccountAlreadyInitializedRule.VIOLATION_MESSAGE));
    }
}