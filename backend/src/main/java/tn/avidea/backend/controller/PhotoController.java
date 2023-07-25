package tn.avidea.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import tn.avidea.backend.service.PhotoService;
import tn.avidea.backend.service.ClaimService;
import tn.avidea.backend.entity.Claim;
import tn.avidea.backend.entity.Photo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class PhotoController {
  private PhotoService photoService;
  private ClaimService claimService;

  PhotoController(@Autowired PhotoService photoService, @Autowired ClaimService claimService) {
    this.photoService = photoService;
    this.claimService = claimService;
  }

  @GetMapping("/photos")
  List<Photo> getAllPhotos() {
    return photoService.getAllPhotos();
  }

  @GetMapping("/photos/{photoId}")
  Photo getPhoto(@PathVariable int photoId) {
    return photoService.getPhoto(photoId);
  }

  @GetMapping("/photos/claim/{claimId}")
  List<Photo> getPhotosByClaim(@PathVariable int claimId) {
    return photoService.getAllPhotosByClaimId(claimId);
  }

  @PostMapping(value = "/photos/add")
  void addPhotos(@RequestBody Claim claim) {
    for (Photo photo : claim.getPhotos()) {
      System.out.println("This is being called");
      photo.setClaim(claim);
    }
    this.claimService.saveClaimWithPhotos(claim);
  }

  @PutMapping(value = "/photos/update")
  void addPhotoToExistingClaim(Claim claim, Photo photo) {
    this.photoService.addPhotoToExistingClaim(photo, claim);
  }

  @DeleteMapping("/photos/delete/{photoId}")
  void deletePhoto(@PathVariable int photoId) {
    photoService.deletePhoto(photoId);
  }

  @DeleteMapping("/photos/{claimId}/deleteall")
  void deletePhotosByClaim(@PathVariable int claimId) {
    photoService.deletePhotosByClaimId(claimId);
  }

}
