package org.visionsoft.common;

import org.springframework.cglib.core.Converter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ConversionServiceFactoryBean;

import java.util.HashSet;
import java.util.Set;

public class ConfTest {

    @Bean("customConverter")
    public Converter myCustomConverter() {
        return new Converter() {
            public Object convert(Object o, Class aClass, Object o1) {
                return null;
            }
        };
    }

    @Bean(name="conversionService")
    public ConversionServiceFactoryBean getConversionService(Set<Converter> converters) {
        ConversionServiceFactoryBean bean = new ConversionServiceFactoryBean();
        bean.setConverters(converters);
        return bean;
    }

}
