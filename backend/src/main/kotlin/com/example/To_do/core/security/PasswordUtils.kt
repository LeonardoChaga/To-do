package com.example.To_do.core.security

import java.security.MessageDigest

object StringUtils {

    private val EMAIL_REGEX =
        Regex("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")

    private val PASSWORD_REGEX =
        Regex("^(?=\\S+$)(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$")

    fun isValidEmail(email: String?): Boolean {
        val value = email?.trim().orEmpty()
        return value.isNotBlank() && EMAIL_REGEX.matches(value)
    }

    fun isValidPassword(password: String?): Boolean {
        val value = password.orEmpty()
        return PASSWORD_REGEX.matches(value)
    }

    fun sha512Hex(text: String): String {
        val bytes = text.toByteArray(Charsets.UTF_8)
        val digest = MessageDigest.getInstance("SHA-512").digest(bytes)
        return digest.joinToString("") { "%02x".format(it) }
    }

    fun verifySha512(raw: String, expectedHashHex: String): Boolean {
        val computed = sha512Hex(raw)
        return computed.equals(expectedHashHex, ignoreCase = true)
    }
}
