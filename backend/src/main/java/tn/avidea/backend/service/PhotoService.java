package tn.avidea.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import tn.avidea.backend.repository.PhotoRepository;
import tn.avidea.backend.repository.ClaimRepository;
import tn.avidea.backend.entity.Photo;
import tn.avidea.backend.entity.Claim;

@Service
@Transactional

public class PhotoService {
  public PhotoRepository photoRepository;
  public ClaimRepository claimRepository;

  public PhotoService(PhotoRepository photoRepository, ClaimRepository claimRepository) {
    this.photoRepository = photoRepository;
  }

  public Photo getPhoto(int photoId) {
    return this.photoRepository.findByPhotoId(photoId);
  }

  public void savePhoto(Photo photo) {
    System.out.println("Photo saved successfully with id: " + photo.getPhotoId());
    photoRepository.save(photo);

  }

  public void addPhotoToExistingClaim(Photo photo, Claim claim) {
    Claim existingClaim = claimRepository.findByClaimId(claim.getClaimId());

    if (existingClaim == null) {
      System.out.println("Claim not found");
      return;
    }

    else {

      List<Photo> photos = existingClaim.getPhotos();
      if (photos == null) {
        photos = new java.util.ArrayList<Photo>();
        photos.add(photo);
      } else {
        photos.add(photo);
      }

      existingClaim.setPhotos(photos);
      claimRepository.save(existingClaim);
    }
  }

  public List<Photo> getAllPhotos() {
    return photoRepository.findAll();
  }

  public List<Photo> getAllPhotosByClaimId(int claimId) {
    return photoRepository.findByClaim(claimRepository.findByClaimId(claimId));
  }

  public void deletePhoto(int photoId) {
    System.out.println("Deleting photo with id: " + photoId);
    photoRepository.deleteById(photoId);
  }

  public void deletePhotosByClaimId(int claimId) {

    photoRepository.deleteByClaim(claimRepository.findByClaimId(claimId));
  }

}
