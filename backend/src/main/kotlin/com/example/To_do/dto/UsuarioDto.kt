package com.example.To_do.dto

import com.example.To_do.entity.Usuario
import java.time.Instant

data class UsuarioDto (
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