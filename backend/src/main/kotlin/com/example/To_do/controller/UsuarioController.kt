package com.example.To_do.controller

import com.example.To_do.business.LoginBusiness
import com.example.To_do.dto.LoginDto
import com.example.To_do.dto.RetornoLoginDto
import com.example.To_do.dto.UsuarioDto
import com.example.To_do.entity.Usuario
import com.example.To_do.repository.UsuarioRepository
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/usuario")
class UsuarioController (
    private val usuarioRepository: UsuarioRepository,
    private val loginBusiness: LoginBusiness
) {

    @PostMapping("cadastrar")
    @Transactional
    suspend fun cadastrarUsuario(@RequestBody usuario: Usuario) {
        usuarioRepository.save(usuario)
    }

    @PostMapping("login")
    @Transactional
    suspend fun login(@RequestBody login: LoginDto) = loginBusiness.login(login)

    @PostMapping("update-token")
    @Transactional
    suspend fun updateToken(
        @RequestBody refreshToken: String
    ): RetornoLoginDto = loginBusiness.atualizarToken(refreshToken)
}