package tn.avidea.backend.dto;

import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ClaimDto {
  private int claimId;
  private String claimNum;
  private OffsetDateTime accidentDate;
  private OffsetDateTime creationDate;
  private String status;
}
