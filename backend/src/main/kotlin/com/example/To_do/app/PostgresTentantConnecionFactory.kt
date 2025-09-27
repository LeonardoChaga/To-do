package com.qualityautomacao.webtodo.app

import io.r2dbc.spi.ConnectionFactoryMetadata
import org.springframework.r2dbc.connection.lookup.AbstractRoutingConnectionFactory
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import reactor.core.publisher.Mono
import java.security.Principal

class PostgresTenantConnectionFactory() : AbstractRoutingConnectionFactory() {
    internal class PostgresqlConnectionFactoryMetadata private constructor() : ConnectionFactoryMetadata {
        override fun getName(): String {
            return NAME
        }

        companion object {
            val INSTANCE = PostgresqlConnectionFactoryMetadata()
            const val NAME = "PostgreSQL"
        }
    }

    override fun determineCurrentLookupKey(): Mono<Any> {
        return Mono.deferContextual { it ->
//            if (it.hasKey("auth_principal")) {
//                val authRequest: Mono<Principal?> = it.get("auth_principal")
//                authRequest.map { auth ->
//                    ((auth as UsernamePasswordAuthenticationToken).principal as AuthRequest).dataSource
//                }
//            }else
            Mono.just("adm")
        }
    }

    override fun getMetadata(): ConnectionFactoryMetadata {
        return PostgresqlConnectionFactoryMetadata.INSTANCE
    }
}