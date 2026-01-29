package com.example.To_do.controller

import com.example.To_do.business.TarefaBusiness
import com.example.To_do.dto.TarefaDto
import com.example.To_do.filter.AuthRequest
import com.example.To_do.repository.TarefaRepository
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/tarefa")
class TarefaController(private val tarefaRepository: TarefaRepository, private val tarefaBusiness: TarefaBusiness) {

    @GetMapping
    suspend fun getAllTasks() = tarefaBusiness.getAllTasks()

    @PostMapping
    suspend fun addTask(@RequestBody tarefa: TarefaDto, @AuthenticationPrincipal authRequest: AuthRequest) =
        tarefaBusiness.addTask(tarefa, authRequest.usuario)

    @PostMapping("alterar-status")
    suspend fun changeTaskStatus(@RequestBody tarefa: TarefaDto) =
        tarefaBusiness.changeTaskStatus(tarefa)

    @PostMapping("alterar-ordem")
    suspend fun changeTaskOrder(@RequestBody tarefa: List<TarefaDto>) =
        tarefaBusiness.changeTaskOrder(tarefa)

    @PutMapping
    suspend fun editTask(@RequestBody tarefa: TarefaDto, @AuthenticationPrincipal authRequest: AuthRequest) =
        tarefaBusiness.editTask(tarefa, authRequest.usuario)

    @DeleteMapping("{tarefa}")
    suspend fun deleteTask(@PathVariable tarefa: UUID) =
        tarefaBusiness.deleteTask(tarefa)
}