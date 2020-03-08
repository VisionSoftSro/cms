package org.visionsoft.common

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer
import org.springframework.cglib.core.Converter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.EnableAspectJAutoProxy
import org.springframework.context.annotation.Import
import org.springframework.context.support.ConversionServiceFactoryBean
import org.visionsoft.cms.mvc.config.MvcConfig
import org.visionsoft.cms.domain.config.DomainConfig
import java.util.HashSet


@SpringBootApplication//(exclude=[DispatcherServletAutoConfiguration::class])
@EnableAspectJAutoProxy
@Import(DomainConfig::class, MvcConfig::class)
class Application: SpringBootServletInitializer() {
    override fun configure(builder: SpringApplicationBuilder) = builder.sources(Application::class.java)!!

    companion object {

        @JvmStatic
        fun main(args: Array<String>) {
            SpringApplication.run(Application::class.java, *args)
        }
    }

}
