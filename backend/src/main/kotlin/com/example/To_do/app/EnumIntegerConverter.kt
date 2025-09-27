package com.qualityautomacao.webtodo.app

import org.springframework.core.convert.TypeDescriptor
import org.springframework.core.convert.converter.GenericConverter
import org.springframework.core.convert.converter.GenericConverter.ConvertiblePair
import java.lang.reflect.Modifier

class EnumIntegerConverter : GenericConverter {

    override fun getConvertibleTypes(): MutableSet<ConvertiblePair> =
        mutableSetOf(
            ConvertiblePair(Integer::class.java, Enum::class.java),
            ConvertiblePair(Enum::class.java, Integer::class.java)
        )

    override fun convert(source: Any?, sourceType: TypeDescriptor, targetType: TypeDescriptor): Any? =
        if (source is Int && targetType.type.isEnum && !Modifier.isAbstract(targetType.type.modifiers))
            targetType.type.enumConstants[source]
        else if (source is Enum<*>)
            source.ordinal
        else
            source

}