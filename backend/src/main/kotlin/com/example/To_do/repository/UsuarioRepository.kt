package com.example.To_do.repository

import com.example.To_do.entity.Usuario
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import java.util.*

interface UsuarioRepository : CoroutineCrudRepository<Usuario, UUID> {

    suspend fun findByEmail(email: String): Usuario?

    @Query("""
        select 
            * 
        from 
            usuario u 
        where 
            u.refresh_token = :refreshToken
    """)
    suspend fun findByRefreshToken(refreshToken: String): Usuario?

}