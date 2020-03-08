package org.visionsoft.cms.mvc.controller.api.admin

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.visionsoft.common.currentUser
import org.visionsoft.common.transaction.transaction
import org.visionsoft.cms.domain.dao.UserDao
import org.visionsoft.cms.domain.scheme.User
import org.visionsoft.cms.mvc.model.converter.UserConverter

@RequestMapping("/user")
@RestController
class CurrentUserController {
    @Autowired
    lateinit var userConverter:UserConverter

    @GetMapping
    fun get() = transaction { currentUser<User>()?.let {userConverter.convertDetailToDto(it)}  }

}
