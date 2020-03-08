package org.visionsoft.cms.mvc.config

import org.springframework.context.annotation.ComponentScan
import org.springframework.web.servlet.config.annotation.EnableWebMvc

@ComponentScan(basePackages = ["org.visionsoft.cms.mvc.controller.api.admin"])
@EnableWebMvc
class AdminApiConfig
