package tn.avidea.backend.mappers;

import tn.avidea.backend.dto.ContractDto;
import tn.avidea.backend.entity.Contract;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")

public interface ContractMapper {
  @Mapping(target = "contractId", source = "contractId")
  @Mapping(target = "contractNum", source = "contractNum")
  ContractDto toContractDto(Contract contract);

  List<ContractDto> toContractDtos(List<Contract> contracts);

}
