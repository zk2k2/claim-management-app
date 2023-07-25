package tn.avidea.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class UserDto {
  private int id;
  private String login;
  private String firstName;
  private String lastName;
  private String token;
}
