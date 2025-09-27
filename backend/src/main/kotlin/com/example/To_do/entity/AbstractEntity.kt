package com.example.To_do.entity

import org.springframework.data.annotation.*
import java.time.Instant
import java.util.*

abstract class AbstractEntity {

    @get:Id
    abstract val id: UUID?

    @get:CreatedBy
    abstract val usuarioCriacao: UUID?

    @get:CreatedDate
    abstract val dataHoraCriacao: Instant

    @get:LastModifiedBy
    abstract val usuarioModificacao: UUID?

    @get:LastModifiedDate
    abstract val dataHoraModificacao: Instant?
}