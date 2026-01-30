package com.example.To_do.business

import com.example.To_do.dto.TarefaDto
import com.example.To_do.entity.Tarefa
import com.example.To_do.repository.TarefaRepository
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.toList
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import java.util.*

@Service
class TarefaBusiness (private val tarefaRepository: TarefaRepository) {

    suspend fun getAllTasks(): List<Tarefa>{
        val tarefas = tarefaRepository.getAllTasks().toList()

        return tarefas
    }

    suspend fun addTask(tarefa: TarefaDto, usuario: UUID) {
        tarefaRepository.save(tarefa.toTarefa(usuario))
    }

    suspend fun editTask(tarefa: TarefaDto, usuario: UUID) {
        val tarefaDB = tarefaRepository.findById(tarefa.id!!) ?: throw ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "Tarefa não encontrada"
        )

        tarefaRepository.save(tarefa.updateTarefa(tarefaDB, usuario))
    }

    suspend fun deleteTask(tarefa: UUID) {
        val tarefaDB = tarefaRepository.findById(tarefa) ?: throw ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "Tarefa não encontrada"
        )

        tarefaRepository.delete(tarefaDB)
    }

    suspend fun changeTaskStatus(tarefa: TarefaDto) {
        val tarefaDB = tarefaRepository.findById(tarefa.id!!) ?: throw ResponseStatusException(
            HttpStatus.NOT_FOUND, "Tarefa não encontrada."
        )

        if (tarefaDB.status !== tarefa.status) {
            tarefaRepository.save(tarefaDB.copy(status = tarefa.status))
        }

    }

    suspend fun changeTaskOrder(tarefas: List<TarefaDto>) {
        tarefas.forEach { tarefa ->
            val tarefaDB = tarefaRepository.findById(tarefa.id!!)
                ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Tarefa não encontrada.")

            tarefaRepository.save(tarefaDB.copy(status = tarefa.status, ordem = tarefa.ordem))
        }
    }
}