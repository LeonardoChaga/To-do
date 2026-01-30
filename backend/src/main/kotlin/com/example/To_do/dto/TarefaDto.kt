package com.example.To_do.dto

import com.example.To_do.entity.Tarefa
import com.example.To_do.enum.PrioridadeTarefaEnum
import com.example.To_do.enum.TarefaStatusEnum
import java.time.Instant
import java.util.*

data class TarefaDto(
    val id: UUID? = UUID.randomUUID(),
    val titulo: String,
    val descricao: String? = null,
    val prioridade: PrioridadeTarefaEnum? = PrioridadeTarefaEnum.BAIXA,
    val status: TarefaStatusEnum? = TarefaStatusEnum.A_FAZER,
    val prazo: Instant,
    val ordem: Int = 0
) {
    fun toTarefa(usuario: UUID) = Tarefa(
        titulo = titulo,
        descricao = descricao,
        prioridade = prioridade,
        status = status,
        prazo = prazo,
        dataHoraCriacao = Instant.now(),
        usuarioCriacao = usuario,
        ordem = ordem
    )

    fun updateTarefa(tarefa: Tarefa, usuario: UUID) = tarefa.copy(
        titulo = titulo,
        descricao = descricao,
        prioridade = prioridade,
        status = status,
        prazo = prazo,
        usuarioCriacao = usuario,
        usuarioModificacao = usuario,
        dataHoraModificacao = Instant.now(),
        ordem = ordem
    )
}