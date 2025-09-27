package com.example.To_do.extensions

import java.util.*

fun String.toUUID(): UUID = UUID.fromString(this)
