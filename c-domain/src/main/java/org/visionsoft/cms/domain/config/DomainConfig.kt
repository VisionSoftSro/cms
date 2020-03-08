package org.visionsoft.cms.domain.config

import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.transaction.annotation.EnableTransactionManagement

@EnableTransactionManagement
@ComponentScan("org.visionsoft.cms.domain")
@EntityScan( "org.visionsoft.cms.domain.scheme" )
@Configuration
class DomainConfig
