package org.visionsoft.cms.domain.scheme

import javax.persistence.*

@Entity
@Table
class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @ManyToMany(cascade = [CascadeType.ALL])
    @JoinTable(name="article_category", joinColumns = [JoinColumn(name="article")], inverseJoinColumns = [JoinColumn(name="category")])
    var categories:List<Category> = mutableListOf()

    var name: String? = null
    var content: String? = null

}
@Entity
@Table
class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
    var name: String? = null
}
