package tn.avidea.backend.mappers;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import tn.avidea.backend.dto.ClaimDto;
import tn.avidea.backend.entity.Claim;

@Mapper(componentModel = "spring")
public interface ClaimMapper {

  @Mapping(target = "status", source = "status")
  @Mapping(target = "claimId", source = "claimId")
  @Mapping(target = "claimNum", source = "claimNum")
  @Mapping(target = "accidentDate", source = "accidentDate")
  @Mapping(target = "creationDate", source = "creationDate")
  ClaimDto toClaimDto(Claim claim);

  List<ClaimDto> toClaimDtos(List<Claim> claims);

}
