package tn.avidea.backend.repository;

import org.springframework.data.repository.CrudRepository;

import tn.avidea.backend.dto.ClaimDto;
import tn.avidea.backend.entity.Claim;
import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Integer> {
  Claim findByClaimId(int claimId);

  List<Claim> findAll();

  Claim findByClaimNum(String claimNum);

}
