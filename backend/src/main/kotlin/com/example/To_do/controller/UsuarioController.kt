package com.example.To_do.controller

import com.example.To_do.business.LoginBusiness
import com.example.To_do.dto.EditarUsuarioDto
import com.example.To_do.dto.LoginDto
import com.example.To_do.dto.RetornoLoginDto
import com.example.To_do.entity.Usuario
import com.example.To_do.repository.UsuarioRepository
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/usuario")
class UsuarioController (
    private val usuarioRepository: UsuarioRepository,
    private val loginBusiness: LoginBusiness
) {

    @GetMapping("{usuario}")
    @Transactional
    suspend fun getUsuarioById(@PathVariable usuario: UUID): Usuario? {
        return usuarioRepository.findById(usuario)
    }

    @PostMapping("cadastrar")
    @Transactional
    suspend fun cadastrarUsuario(@RequestBody usuario: Usuario) {
        loginBusiness.cadastrarUsuario(usuario)
    }

    @PutMapping("editar")
    @Transactional
    suspend fun editarUsuario(@RequestBody usuario: EditarUsuarioDto) {
        loginBusiness.editarUsuario(usuario)
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