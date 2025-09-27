package com.example.To_do.business

import com.example.To_do.dto.TarefaDto
import com.example.To_do.entity.Tarefa
import com.example.To_do.repository.TarefaRepository
import kotlinx.coroutines.flow.toList
import org.springframework.stereotype.Service
import java.util.*

@Service
class TarefaBusiness (private val tarefaRepository: TarefaRepository) {

    suspend fun retornarTarefas(): List<Tarefa>{
        val tarefas = tarefaRepository.findAll().toList()

        return tarefas
    }

    suspend fun cadastrarTarefa(tarefa: TarefaDto,usuario: UUID) {
        tarefaRepository.save(tarefa.toTarefa(usuario))
    }
}