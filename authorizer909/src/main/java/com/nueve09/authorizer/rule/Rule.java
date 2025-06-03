package com.nueve09.authorizer.rule;

import com.nueve09.authorizer.model.Account;
import com.nueve09.authorizer.model.Transaction;

import java.util.List;

// This interface is more for conceptual separation if we wanted to dynamically load rules
// For this challenge, static methods in rule classes are sufficient.
public interface Rule {
    void check(Account account, Transaction transaction, List<String> violations);
}