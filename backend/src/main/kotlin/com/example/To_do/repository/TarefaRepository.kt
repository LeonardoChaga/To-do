package com.example.To_do.repository

import com.example.To_do.entity.Tarefa
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import java.util.*

interface TarefaRepository: CoroutineCrudRepository<Tarefa, UUID> {

}