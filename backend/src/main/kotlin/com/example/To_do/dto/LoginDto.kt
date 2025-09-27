package com.example.To_do.dto

data class LoginDto (
    val email: String,
    val senha: String
) {
    val loginLowercaseTrim: String
        get() = email.lowercase().trim()
}