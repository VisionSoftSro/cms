package org.visionsoft.cms.domain.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.visionsoft.cms.domain.scheme.Article
import org.visionsoft.cms.domain.scheme.Category

interface ArticleRepository: JpaRepository<Article, Long>
interface CategoryRepository: JpaRepository<Category, Long>
