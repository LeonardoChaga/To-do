package com.example.To_do.filter

import com.example.To_do.repository.UsuarioRepository
import kotlinx.coroutines.reactor.mono
import org.springframework.context.annotation.Primary
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.ReactiveAuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import org.springframework.web.server.ResponseStatusException
import reactor.core.publisher.Mono

@Component
@Primary
class JWTAuthorizationFilter(
    val usuarioRepository: UsuarioRepository
) : ReactiveAuthenticationManager {

    override fun authenticate(authentication: Authentication): Mono<Authentication> {
        val authRequest = authentication.principal as AuthRequest
        return mono {
            usuarioRepository.findById(authRequest.usuario)?.let {
                UsernamePasswordAuthenticationToken(
                    authRequest,
                    null,
                    null
                )
            } ?: throw throw ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Credenciais inválidas"
            )
        }
    }
}