package tn.avidea.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import tn.avidea.backend.service.ContractService;
import tn.avidea.backend.dto.ContractDto;
import tn.avidea.backend.entity.Claim;
import tn.avidea.backend.entity.Contract;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")

public class ContractController {
  private ContractService contractService;

  ContractController(@Autowired ContractService contractService) {
    this.contractService = contractService;
  }

  @PostMapping(value = "/contracts/add")
  void addContract(@RequestBody Contract contract) {
    this.contractService.saveContract(contract);
  }

  @GetMapping("/contracts/{contractId}")
  Contract getContract(@PathVariable int contractId) {
    return contractService.getContract(contractId);
  }

  @GetMapping("/contract/{contractNum}")
  Contract getContractByContractNum(@PathVariable String contractNum) {
    return contractService.getContractByContractNum(contractNum);
  }

  @GetMapping("/contracts/dtocontracts")
  List<ContractDto> getAllContractDtos() {
    return contractService.findAllContractDtos();
  }

}
