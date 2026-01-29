package com.example.To_do.repository

import com.example.To_do.entity.Tarefa
import kotlinx.coroutines.flow.Flow
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import java.util.*

interface TarefaRepository: CoroutineCrudRepository<Tarefa, UUID> {

    @Query(
        "SELECT * " +
                "FROM tarefa t " +
                "ORDER BY ordem"
    )
    fun getAllTasks(): Flow<Tarefa>
}