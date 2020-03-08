package org.visionsoft.cms.domain.dao

import org.springframework.stereotype.Component
import org.visionsoft.common.domain.GenericDao
import org.visionsoft.cms.domain.scheme.User

@Component
class UserDao: GenericDao<User>(User::class.java)

