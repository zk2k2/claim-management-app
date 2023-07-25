package tn.avidea.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

public class MessagesController {
  @GetMapping("/messages")
  public ResponseEntity<List<String>> messages() {
    return ResponseEntity.ok(List.of("Message 1", "Message 2", "Message 3"));
  }
}
