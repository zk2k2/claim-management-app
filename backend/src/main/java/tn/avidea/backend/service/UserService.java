package tn.avidea.backend.service;

import org.springframework.stereotype.Service;

import tn.avidea.backend.repository.UserRepository;

import java.nio.CharBuffer;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import tn.avidea.backend.dto.CredentialsDto;
import tn.avidea.backend.dto.SignUpDto;
import tn.avidea.backend.dto.UserDto;
import tn.avidea.backend.entity.User;
import lombok.RequiredArgsConstructor;
import java.util.Optional;

import tn.avidea.backend.exception.AuthException;
import tn.avidea.backend.mappers.UserMapper;

@RequiredArgsConstructor
@Service
public class UserService {

  private final UserRepository userRepository;

  private final PasswordEncoder passwordEncoder;

  private final UserMapper userMapper;

  public UserDto login(CredentialsDto credentialsDto) {
    User user = userRepository.findByLogin(credentialsDto.login())
        .orElseThrow(() -> new AuthException("Unknown user", HttpStatus.NOT_FOUND));

    if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.password()), user.getPassword())) {

      return userMapper.toUserDto(user);
    }
    throw new AuthException("Invalid password", HttpStatus.BAD_REQUEST);
  }

  public UserDto register(SignUpDto userDto) {
    Optional<User> optionalUser = userRepository.findByLogin(userDto.login());

    if (optionalUser.isPresent()) {
      throw new AuthException("Login already exists", HttpStatus.BAD_REQUEST);
    }

    User user = userMapper.signUpToUser(userDto);
    user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.password())));

    User savedUser = userRepository.save(user);

    return userMapper.toUserDto(savedUser);
  }

  public UserDto findByLogin(String login) {
    User user = userRepository.findByLogin(login)
        .orElseThrow(() -> new AuthException("Unknown user", HttpStatus.NOT_FOUND));
    return userMapper.toUserDto(user);
  }

}