package com.example.To_do.entity

import com.example.To_do.enum.PrioridadeTarefaEnum
import com.example.To_do.enum.TarefaStatusEnum
import java.time.Instant
import java.util.*

data class Tarefa (
    override val id: UUID? = null,
    val titulo: String,
    val descricao: String? = null,
    val prioridade: PrioridadeTarefaEnum? = PrioridadeTarefaEnum.BAIXA,
    val status: TarefaStatusEnum? = TarefaStatusEnum.A_FAZER,
    val prazo: Instant,
    override val usuarioCriacao: UUID? = null,
    override val dataHoraCriacao: Instant = Instant.now(),
    override val usuarioModificacao: UUID? = null,
    override val dataHoraModificacao: Instant? = null,
) : AbstractEntity()