package tn.avidea.backend.service;

import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;
import tn.avidea.backend.repository.ContractRepository;
import tn.avidea.backend.entity.Contract;
import jakarta.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ContractService {
  public ContractRepository contractRepository;

  @Autowired
  public ContractService(ContractRepository contractRepository) {
    this.contractRepository = contractRepository;
  }

  public void saveContract(Contract contract) {

    contractRepository.save(contract);
    System.out.println("Contract saved successfully with id: " + contract.getContractId());
  }

  public void deleteContract(int contractId) {
    System.out.println("Deleting contract with id: " + contractId);
    contractRepository.deleteById(contractId);
  }

  public Contract getContract(int contractId) {
    return contractRepository.findByContractId(contractId);
  }

  public Contract getContractByContractNum(String contractNum) {
    return contractRepository.findByContractNum(contractNum);
  }
}
