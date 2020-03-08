package org.visionsoft.cms.mvc.model.converter

import org.mapstruct.InheritInverseConfiguration
import org.mapstruct.Mapper
import org.mapstruct.Mappings
import org.visionsoft.cms.mvc.model.dto.UserDto
import org.visionsoft.cms.domain.scheme.User

@Mapper(componentModel = "spring")
interface UserConverter {

    @Mappings
    fun convertDetailToDto(person: User) : UserDto

    @InheritInverseConfiguration
    fun convertDetailToModel(personDto: UserDto) : User

}
