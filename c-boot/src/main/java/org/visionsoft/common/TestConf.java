package org.visionsoft.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Converter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ConversionServiceFactoryBean;
import org.springframework.core.convert.ConversionService;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

public class TestConf {

    @Autowired
    ConversionService conversionService;

    @PostConstruct
    public void init() {
        Integer i = conversionService.convert("123", Integer.class);
        System.out.println(i);
    }

}
