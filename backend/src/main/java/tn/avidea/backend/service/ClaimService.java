package tn.avidea.backend.service;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import tn.avidea.backend.repository.ClaimRepository;
import tn.avidea.backend.dto.ClaimDto;
import tn.avidea.backend.entity.Claim;
import tn.avidea.backend.entity.Photo;
import tn.avidea.backend.mappers.ClaimMapper;

import org.springframework.http.ResponseEntity;

import java.util.List;

@Service
@Transactional
public class ClaimService {
  private final ClaimMapper claimMapper;

  public ClaimRepository claimRepository;

  public ClaimService(ClaimRepository claimRepository, ClaimMapper claimMapper) {
    this.claimRepository = claimRepository;
    this.claimMapper = claimMapper;
  }

  public void saveClaim(Claim claim) {
    claimRepository.save(claim);
  }

  public List<ClaimDto> findAllClaimDtos() {
    List<Claim> claims = claimRepository.findAll();
    return claimMapper.toClaimDtos(claims);
  }

  public void saveClaimWithPhotos(Claim claim) {
    for (Photo photo : claim.getPhotos()) {
      System.out.println("Photo saved successfully with id: " + photo.getPhotoId());
      System.out.println("Claim id is: " + photo.getClaim().getClaimId());
      photo.setClaim(claim);
    }
    claimRepository.save(claim);
    System.out.println("Claim saved eriksen successfully with id: " + claim.getClaimId());
  }

  public List<Claim> getAllClaims() {
    return claimRepository.findAll();
  }

  public Claim getClaim(int claimId) {
    return claimRepository.findByClaimId(claimId);
  }

  public Claim getClaimByNum(String claimNum) {
    return claimRepository.findByClaimNum(claimNum);
  }

  public void deleteClaim(int claimId) {
    System.out.println("Deleting claim with id: " + claimId);
    claimRepository.deleteById(claimId);
  }

  public ResponseEntity<Claim> updateClaim(int claimId, Claim claim) {
    Claim existingClaim = claimRepository.findByClaimId(claimId);
    if (existingClaim == null) {
      return new ResponseEntity<Claim>(HttpStatus.NOT_FOUND);
    }
    existingClaim.setClaimNum(claim.getClaimNum());
    existingClaim.setCreationDate(claim.getCreationDate());
    existingClaim.setAccidentDate(claim.getAccidentDate());
    existingClaim.setStatus(claim.getStatus());
    existingClaim.setContract(claim.getContract());
    if (existingClaim.getPhotos() != null && claim.getPhotos() != null) {
      List<Photo> existingPhotos = existingClaim.getPhotos();
      for (Photo photo : claim.getPhotos()) {
        if (!existingPhotos.contains(photo)) {
          existingPhotos.add(photo);
        }
      }
      if (existingClaim.getPhotos().size() > 0) {
        existingClaim.setPhotos(existingPhotos);
      }

    }

    claimRepository.save(existingClaim);
    return new ResponseEntity<Claim>(HttpStatus.OK);
  }
}