package tn.avidea.backend.repository;

import org.springframework.data.repository.CrudRepository;
import tn.avidea.backend.entity.Photo;
import tn.avidea.backend.entity.Claim;
import java.util.List;

public interface PhotoRepository extends CrudRepository<Photo, Integer> {
  Photo findByPhotoId(int photoId);

  List<Photo> findAll();

  List<Photo> findByClaim(Claim claim);

  void deleteByClaim(Claim claim);

}
