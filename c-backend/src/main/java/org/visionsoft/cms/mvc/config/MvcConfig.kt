package org.visionsoft.cms.mvc.config

import org.springframework.web.servlet.DispatcherServlet
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.boot.web.servlet.ServletRegistrationBean
import org.springframework.context.ApplicationContext
import org.springframework.context.annotation.*


@Configuration
@Import(AppInitialization::class, SecurityConfig::class)
@ComponentScan("org.visionsoft.cms.mvc.model.converter")
class MvcConfig {



    @Bean
    fun apiAdminV1(): ServletRegistrationBean<*> {
        val root = AnnotationConfigWebApplicationContext()
        root.register(AdminApiConfig::class.java)
        val servletRegistrationBean = ServletRegistrationBean(DispatcherServlet(root), "/api/admin/*")
        servletRegistrationBean.setName("admin-api-v1")
        return servletRegistrationBean
    }

    @Bean
    fun apiWebV1(): ServletRegistrationBean<*> {
        val root = AnnotationConfigWebApplicationContext()
        root.register(WebApiConfig::class.java)
        val servletRegistrationBean = ServletRegistrationBean(DispatcherServlet(root), "/api/web/*")
        servletRegistrationBean.setName("web-api-v1")
        return servletRegistrationBean
    }




}


