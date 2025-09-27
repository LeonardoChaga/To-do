package com.example.To_do.entity

import org.springframework.data.relational.core.mapping.Table
import java.time.Instant
import java.util.*

data class Usuario(
    override val id: UUID? = null,
    val senha: String,
    val nome: String = "",
    val email: String = "",
    val refreshToken: String? = null,
    val ativo: Boolean = true,
    val tokenFirebase: String? = null,
    override val usuarioCriacao: UUID? = null,
    override val dataHoraCriacao: Instant = Instant.now(),
    override val usuarioModificacao: UUID? = null,
    override val dataHoraModificacao: Instant? = null,
): AbstractEntity()