package com.example.To_do.dto

import java.util.*

data class RetornoLoginDto(
    val id: UUID,
    val nome: String,
    val email: String,
    val accessToken: String,
    val refreshToken: String
)