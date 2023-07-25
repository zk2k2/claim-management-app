package tn.avidea.backend.controller;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tn.avidea.backend.dto.SignUpDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import tn.avidea.backend.dto.CredentialsDto;
import tn.avidea.backend.dto.UserDto;
import tn.avidea.backend.service.UserService;
import tn.avidea.backend.config.UserAuthProvider;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
  private final UserService userService;
  private final UserAuthProvider userAuthProvider;

  @PostMapping("/login")
  public ResponseEntity<UserDto> login(@RequestBody CredentialsDto credentialsDto) {
    UserDto userDto = userService.login(credentialsDto);
    userDto.setToken(userAuthProvider.createToken(userDto));
    ResponseEntity<UserDto> responseEntity = ResponseEntity.ok(userDto);
    System.out.println("This is the response entity" + responseEntity);
    return responseEntity;
  }

  @PostMapping("/register")
  public ResponseEntity<UserDto> register(@RequestBody @Valid SignUpDto user) {
    UserDto createdUser = userService.register(user);
    createdUser.setToken(userAuthProvider.createToken(createdUser));
    return ResponseEntity.created(URI.create("/users/" +
        createdUser.getId())).body(createdUser);
  }
}
