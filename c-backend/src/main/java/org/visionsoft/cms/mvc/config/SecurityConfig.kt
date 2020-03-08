package org.visionsoft.cms.mvc.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.core.Authentication
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer
import org.visionsoft.common.applyAndPersist
import org.visionsoft.common.config.security.OauthSecurityConfiguration
import org.visionsoft.common.transaction.transaction
import org.visionsoft.cms.domain.scheme.RoleCode
import org.visionsoft.cms.domain.scheme.User
import org.visionsoft.cms.domain.service.UserService


@EnableResourceServer
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Configuration
@ConfigurationProperties(prefix = "oauth")
class SecurityConfig: OauthSecurityConfiguration<User>() {

    @Autowired
    lateinit var userService: UserService

    override fun extractAuthentication(auth: Authentication): User {
        var user: User? = userService.findUser(auth.name)
        if(user == null) {
            user = transaction {
                User().applyAndPersist {
                    email = auth.name
                    enabled = true
                    roles.addAll(auth.authorities.map { it.authority })
                }
            }
        }
        return user!!
    }

    override fun configure(http: HttpSecurity) {
        println("************Configure http*******************")
        http
                .antMatcher("/**").authorizeRequests()

                //authenticate public api requests
                .antMatchers("/api/web/**").permitAll()
                //authenticate admin api requests
                .antMatchers("/api/admin/**").hasRole("ADMIN")


                //any other request is not secured
                .anyRequest()
                .permitAll()


    }
}
