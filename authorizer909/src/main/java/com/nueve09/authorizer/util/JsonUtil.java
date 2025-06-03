package com.nueve09.authorizer.util;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Utilidad para proporcionar una instancia singleton de ObjectMapper.
 * Evita la creación redundante de instancias para parseo JSON.
 */
public class JsonUtil {
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper(); // Instancia singleton de Jackson

    /**
     * Obtiene la instancia de ObjectMapper para parseo JSON.
     * @return Instancia de ObjectMapper.
     */
    public static ObjectMapper getObjectMapper() {
        return OBJECT_MAPPER;
    }
}