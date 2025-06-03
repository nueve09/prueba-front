package com.nueve09.authorizer.model;

/**
 * Clase que representa una cuenta bancaria con una tarjeta activa y un límite disponible.
 * Se utiliza para almacenar el estado de la cuenta y proporcionar acceso a sus atributos.
 */
public class Account {
    private boolean activeCard; // Indica si la tarjeta está activa
    private int availableLimit; // Límite disponible de la cuenta

    /**
     * Constructor para inicializar una cuenta con tarjeta activa y límite disponible.
     * @param activeCard Indica si la tarjeta está activa.
     * @param availableLimit Límite disponible de la cuenta en moneda sin centavos.
     */
    public Account(boolean activeCard, int availableLimit) {
        this.activeCard = activeCard;
        this.availableLimit = availableLimit;
    }

    /**
     * Obtiene el estado de la tarjeta.
     * @return true si la tarjeta está activa, false en caso contrario.
     */
    public boolean isActiveCard() {
        return activeCard;
    }

    /**
     * Establece el estado de la tarjeta.
     * @param activeCard true para activar la tarjeta, false para desactivarla.
     */
    public void setActiveCard(boolean activeCard) {
        this.activeCard = activeCard;
    }

    /**
     * Obtiene el límite disponible de la cuenta.
     * @return Límite disponible en moneda sin centavos.
     */
    public int getAvailableLimit() {
        return availableLimit;
    }

    /**
     * Establece el límite disponible de la cuenta.
     * @param availableLimit Nuevo límite disponible en moneda sin centavos.
     */
    public void setAvailableLimit(int availableLimit) {
        this.availableLimit = availableLimit;
    }

    /**
     * Constructor sin argumentos para serialización.
     */
    public Account() {}
}