package com.example.To_do.business

import com.example.To_do.dto.LoginDto
import com.example.To_do.dto.RetornoLoginDto
import com.example.To_do.repository.UsuarioRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import java.util.*
import kotlin.random.Random
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.example.To_do.entity.Usuario
import org.springframework.core.env.Environment
import java.time.OffsetDateTime


@Service
class LoginBusiness(
    private val usuarioRepository: UsuarioRepository, private val env: Environment,
) {

    private val dev: Boolean = env.acceptsProfiles { it.test("dev") }

    suspend fun login(login: LoginDto): RetornoLoginDto {
        var usuario = usuarioRepository.findByEmail(login.loginLowercaseTrim) ?: throw ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "Usuário não encontrado."
        )

        if (usuario.senha != login.senha) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Senha inválida.")
        }

        if (!usuario.ativo) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário inativo.")
        }

        usuario = usuarioRepository.save(
            usuario.copy(
                refreshToken = refreshToken(),
            )
        )

        return RetornoLoginDto(
            id = usuario.id!!,
            nome = usuario.nome,
            email = usuario.email,
            refreshToken = usuario.refreshToken!!,
            accessToken = accessToken(
                usuario.id.toString()
            ),
        )

    }


    suspend fun atualizarToken(refreshToken: String): RetornoLoginDto {
        val usuario = usuarioRepository.findByRefreshToken(refreshToken)
            ?: throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "RefreshToken não encontrado.")

        return atualizarTokenUsuario(usuario)
    }


    suspend fun atualizarTokenUsuario(usuario: Usuario): RetornoLoginDto {
        if (!usuario.ativo)
            throw ResponseStatusException(HttpStatus.PRECONDITION_FAILED, "Usuário inativo.")


        val usuarioDB = usuarioRepository.save(usuario.copy(refreshToken = refreshToken()))

        return RetornoLoginDto(
            id = usuarioDB.id!!,
            nome = usuarioDB.nome,
            email = usuarioDB.email,
            refreshToken = usuarioDB.refreshToken!!,
            accessToken = accessToken(
                usuarioDB.id.toString()
            ),
        )
    }


    private fun refreshToken() =
        Base64.getEncoder().encodeToString(Random.nextBytes(256)).replace("\\W".toRegex(), "")

    private fun accessToken(idUsuario: String): String =
        JWT.create()
            .withSubject(idUsuario)
            .withClaim("datasource", "b1")
            .withExpiresAt(OffsetDateTime.now().plusMinutes(if (dev) 10_000 else 10_000).toInstant())
            .sign(Algorithm.HMAC512("58sfF3544rSFG90G"))
}