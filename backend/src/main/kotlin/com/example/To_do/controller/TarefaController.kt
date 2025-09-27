package com.example.To_do.controller

import com.example.To_do.business.TarefaBusiness
import com.example.To_do.dto.TarefaDto
import com.example.To_do.filter.AuthRequest
import com.example.To_do.repository.TarefaRepository
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/tarefa")
class TarefaController(private val tarefaRepository: TarefaRepository, private val tarefaBusiness: TarefaBusiness) {

    @GetMapping
    suspend fun retornarTarefas() = tarefaBusiness.retornarTarefas()

    @PostMapping
    suspend fun cadastrarTarefa(@RequestBody tarefa: TarefaDto, @AuthenticationPrincipal authRequest: AuthRequest) =
        tarefaBusiness.cadastrarTarefa(tarefa, authRequest.usuario)
}