package com.example.To_do.enum

import com.fasterxml.jackson.annotation.JsonValue

enum class PrioridadeTarefaEnum {
    BAIXA,
    MEDIA,
    ALTA,
    URGENTE;

    @JsonValue
    fun toValue() = ordinal
}