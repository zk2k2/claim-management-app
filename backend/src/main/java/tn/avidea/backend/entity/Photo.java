package tn.avidea.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;

import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;

@Entity
@Table(name = "Photo")
public class Photo {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int photoId;

  @ManyToOne(fetch = FetchType.LAZY, optional = true)
  // @JoinColumn(name = "claim_id")
  private Claim claim;

  @Column(name = "file_name", length = 150)
  private String fileName;

  @Column(name = "file_path", length = 150)
  private String filePath;

  protected Photo() {
  }

  public Photo(int photoId, Claim claim, String fileName, String filePath) {
    this.photoId = photoId;
    this.claim = claim;
    this.fileName = fileName;
    this.filePath = filePath;
  }

  public Photo(Claim claim, String fileName, String filePath) {

    this.claim = claim;
    this.fileName = fileName;
    this.filePath = filePath;
  }

  public int getPhotoId() {
    return this.photoId;
  }

  public void setPhotoId(int photoId) {
    this.photoId = photoId;
  }

  public Claim getClaim() {
    return this.claim;
  }

  public void setClaim(Claim claim) {
    this.claim = claim;
  }

  public String getFileName() {
    return this.fileName;
  }

  public void setFileName(String fileName) {
    this.fileName = fileName;
  }

  public String getFilePath() {
    return this.filePath;
  }

  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }

  @Override
  public String toString() {
    return "{" +
        " photoId='" + getPhotoId() + "'" +
        ", claim='" + getClaim() + "'" +
        ", fileName='" + getFileName() + "'" +
        ", filePath='" + getFilePath() + "'" +
        "}";
  }

}
