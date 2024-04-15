package tn.avidea.backend.repository;

import tn.avidea.backend.entity.Claim;
import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Integer> {
  Claim findByClaimId(int claimId);

  List<Claim> findAll();

  Claim findByClaimNum(String claimNum);

}
