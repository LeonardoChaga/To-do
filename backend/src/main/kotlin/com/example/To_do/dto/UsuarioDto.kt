package com.example.To_do.dto

import com.example.To_do.entity.Usuario
import java.time.Instant
import java.util.*

data class UsuarioDto (
    val id: UUID? = UUID.randomUUID(),
    val senha: String,
    val nome: String = "",
    val email: String = "",
    val refreshToken: String? = null,
    val ativo: Boolean = true,
    val tokenFirebase: String? = null
) {
    fun toUsuario() = Usuario (
        nome = nome,
        senha = senha,
        email = email,
        dataHoraCriacao = Instant.now()
    )
}

data class EditarUsuarioDto(
    val id: UUID? = UUID.randomUUID(),
    val nome: String = "",
    val email: String = "",
) {

    fun updateUsuario(usuario: Usuario, usuarioId: UUID) = usuario.copy(
        nome = nome,
        email = email,
        dataHoraModificacao = Instant.now(),
        usuarioModificacao = usuarioId
    )
}

