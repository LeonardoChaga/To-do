package com.example.To_do.enum

import com.fasterxml.jackson.annotation.JsonValue

enum class TarefaStatusEnum {
    A_FAZER,
    EM_ANDAMENTO,
    EM_REVISAO,
    FINALIZADA,
    ARQUIVADO;

    @JsonValue
    fun toValue() = ordinal
}