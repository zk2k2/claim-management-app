package tn.avidea.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import tn.avidea.backend.service.ClaimService;
import tn.avidea.backend.dto.ClaimDto;
import tn.avidea.backend.entity.Claim;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ClaimController {
  private ClaimService claimService;

  ClaimController(@Autowired ClaimService claimService) {
    this.claimService = claimService;
  }

  @GetMapping("/claims")
  List<ClaimDto> getAllClaimDtos() {
    return claimService.findAllClaimDtos();
  }

  @GetMapping("/claims/{claimId}")
  Claim getClaim(@PathVariable int claimId) {
    return claimService.getClaim(claimId);
  }

  @GetMapping("/claims/claimsbynum/{claimNum}")
  Claim getClaimByNum(@PathVariable String claimNum) {
    return claimService.getClaimByNum(claimNum);
  }

  @DeleteMapping("/claims/delete/{claimId}")
  void deleteClaim(@PathVariable int claimId) {
    claimService.deleteClaim(claimId);
  }

  @PostMapping(value = "/claims/add")
  void addClaim(@RequestBody Claim claim) {
    this.claimService.saveClaim(claim);
  }

  @PutMapping("/claims/edit/{claimId}")
  void updateClaim(@PathVariable int claimId, @RequestBody Claim claim) {
    claimService.updateClaim(claimId, claim);
  }
}
