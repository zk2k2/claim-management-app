package tn.avidea.backend.config;

import javax.security.auth.login.LoginException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import tn.avidea.backend.dto.ErrorDto;
import org.springframework.http.HttpStatus;

@ControllerAdvice
public class RestExceptionHandler {
  @ExceptionHandler(value = { LoginException.class })
  @ResponseBody
  public ResponseEntity<ErrorDto> handleLoginException(LoginException e) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorDto(e.getMessage()));
  }

}
