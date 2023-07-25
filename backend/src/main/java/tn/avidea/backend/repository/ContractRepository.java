package tn.avidea.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.avidea.backend.entity.Contract;
import java.util.List;

@Repository
public interface ContractRepository extends CrudRepository<Contract, Integer> {

  Contract findByContractId(int contractId);

  Contract findByContractNum(String contractNum);

  List<Contract> findAll();

}
