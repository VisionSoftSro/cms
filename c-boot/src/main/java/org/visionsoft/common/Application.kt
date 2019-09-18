package org.visionsoft.common

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration
import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer
import org.springframework.context.annotation.EnableAspectJAutoProxy
import org.springframework.context.annotation.Import
import org.visionsoft.cmr.mvc.config.MvcConfig
import org.visionsoft.crm.domain.config.DomainConfig


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