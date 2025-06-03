package com.nueve09.authorizer.model;

import java.time.Instant;

/**
 * Clase que representa una transacción con comerciante, monto y fecha/hora.
 * Se utiliza para registrar y validar transacciones en la aplicación.
 */
public class Transaction {
    private String merchant; // Nombre del comerciante
    private int amount; // Monto de la transacción
    private Instant time; // Fecha y hora de la transacción

    /**
     * Constructor para inicializar una transacción.
     * @param merchant Nombre del comerciante.
     * @param amount Monto de la transacción en moneda sin centavos.
     * @param time Fecha y hora de la transacción (formato ISO 8601).
     */
    public Transaction(String merchant, int amount, Instant time) {
        this.merchant = merchant;
        this.amount = amount;
        this.time = time;
    }

    /**
     * Obtiene el nombre del comerciante.
     * @return Nombre del comerciante.
     */
    public String getMerchant() {
        return merchant;
    }

    /**
     * Establece el nombre del comerciante.
     * @param merchant Nombre del comerciante.
     */
    public void setMerchant(String merchant) {
        this.merchant = merchant;
    }

    /**
     * Obtiene el monto de la transacción.
     * @return Monto en moneda sin centavos.
     */
    public int getAmount() {
        return amount;
    }

    /**
     * Establece el monto de la transacción.
     * @param amount Monto en moneda sin centavos.
     */
    public void setAmount(int amount) {
        this.amount = amount;
    }

    /**
     * Obtiene la fecha y hora de la transacción.
     * @return Instante de la transacción.
     */
    public Instant getTime() {
        return time;
    }

    /**
     * Establece la fecha y hora de la transacción.
     * @param time Instante de la transacción (formato ISO 8601).
     */
    public void setTime(Instant time) {
        this.time = time;
    }

    /**
     * Constructor sin argumentos para serialización con Jackson.
     */
    public Transaction() {}
}