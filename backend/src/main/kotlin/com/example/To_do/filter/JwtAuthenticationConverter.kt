package com.example.To_do.filter

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.exceptions.TokenExpiredException
import com.example.To_do.extensions.toUUID
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter
import org.springframework.stereotype.Component
import org.springframework.web.server.ResponseStatusException
import org.springframework.web.server.ServerWebExchange
import reactor.core.publisher.Mono

import org.springframework.beans.factory.annotation.Value

@Component
class JwtAuthenticationConverter(
    @Value("\${jwt.secret}") private val secretKey: String
) : ServerAuthenticationConverter {

    override fun convert(exchange: ServerWebExchange?): Mono<Authentication> {
        return Mono.justOrEmpty(exchange)
            .flatMap { Mono.justOrEmpty(it.request.headers.getFirst("Authorization")) }
            .filter { it.isNotEmpty() }
            .filter { it.startsWith("Bearer ") }
            .map { it.substringAfter("Bearer ") }
            .map {
                val decodedJWT = JWT.require(Algorithm.HMAC512(secretKey))
                    .build()
                    .verify(it)

                UsernamePasswordAuthenticationToken(
                    AuthRequest(
                        usuario = decodedJWT.subject.toUUID()
                    ),
                    null,
                    emptyList()
                ) as Authentication
            }
            .onErrorResume(TokenExpiredException::class.java) {
                Mono.error(ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token expirado"))
            }
    }
}
