package com.example.To_do.filter

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.SecurityWebFiltersOrder
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.config.web.server.invoke
import org.springframework.security.web.server.SecurityWebFilterChain
import org.springframework.security.web.server.authentication.AuthenticationWebFilter
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatcher
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.reactive.CorsConfigurationSource
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource
import reactor.kotlin.core.publisher.toMono


@Configuration
@EnableWebFluxSecurity
class WebSecurity(
    private val jwtAuthorizationFilter: JWTAuthorizationFilter,
    private val jwtAuthenticationConverter: JwtAuthenticationConverter
) {
    private val API_KEY_HEADER_NAME = "X-API-Key"

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = listOf("*")
        configuration.allowedMethods = listOf("*")
        configuration.allowedHeaders = listOf("*")

        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }


    private fun authMatcher(): ServerWebExchangeMatcher {
        return ServerWebExchangeMatcher { exchange ->
            val authHeader = exchange.request.headers.getFirst(HttpHeaders.AUTHORIZATION)
                ?: exchange.request.headers.getFirst(API_KEY_HEADER_NAME)

            if (authHeader != null && !authHeader.startsWith("Bearer")) {
                ServerWebExchangeMatcher.MatchResult.match()
            } else {
                ServerWebExchangeMatcher.MatchResult.notMatch()
            }.toMono()
        }
    }

    @Bean
    fun configure(
        http: ServerHttpSecurity
    ): SecurityWebFilterChain {
        val authenticationWebFilter = AuthenticationWebFilter(jwtAuthorizationFilter).apply {
            setServerAuthenticationConverter(jwtAuthenticationConverter)
        }

        return http {
            csrf {
                disable()
            }
            cors {
                configurationSource = corsConfigurationSource()
            }
            authorizeExchange {
                authorize(ServerWebExchangeMatchers.pathMatchers(HttpMethod.POST, "/usuario/login"), permitAll)
                authorize(anyExchange, authenticated)
            }
            addFilterAt(authenticationWebFilter, SecurityWebFiltersOrder.AUTHENTICATION)
        }
    }
}