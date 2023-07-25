package tn.avidea.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import tn.avidea.backend.dto.SignUpDto;
import tn.avidea.backend.dto.UserDto;
import tn.avidea.backend.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
  UserDto toUserDto(User user);

  @Mapping(target = "password", ignore = true)
  User signUpToUser(SignUpDto signUpDto);

}
