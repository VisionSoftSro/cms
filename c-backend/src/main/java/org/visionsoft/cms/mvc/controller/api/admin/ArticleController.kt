package org.visionsoft.cms.mvc.controller.api.admin

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.visionsoft.cms.domain.repository.ArticleRepository

@RequestMapping("/article")
@RestController
class ArticleController {
    @Autowired
    lateinit var articleRepository: ArticleRepository

    @GetMapping
    fun get() = articleRepository.findAll()

}
