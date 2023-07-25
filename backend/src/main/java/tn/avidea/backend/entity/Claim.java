package tn.avidea.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Column;
import jakarta.persistence.GenerationType;
import java.time.OffsetDateTime;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;

import java.util.List;

@Entity
@Table(name = "claim")
public class Claim {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int claimId;

  @OneToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.EAGER, orphanRemoval = true)
  @JoinColumn(name = "claim_id")
  private List<Photo> photos;

  @ManyToOne()
  private Contract contract;

  @Column(name = "claim_num", length = 20)
  private String claimNum;

  @Column(name = "status", length = 15)
  private String status;

  @Column(name = "creation_date")
  private OffsetDateTime creationDate;

  @Column(name = "accident_date")
  private OffsetDateTime accidentDate;

  protected Claim() {
  }

  public Claim(Contract contract, int claimId, String claimNum, String status, OffsetDateTime creationDate,
      OffsetDateTime accidentDate) {
    this.contract = contract;
    this.claimId = claimId;
    this.claimNum = claimNum;
    this.status = status;
    this.creationDate = creationDate;
    this.accidentDate = accidentDate;
  }

  public Claim(Contract contract, String claimNum, String status, OffsetDateTime creationDate,
      OffsetDateTime accidentDate, List<Photo> photos) {
    this.contract = contract;
    this.claimNum = claimNum;
    this.status = status;
    this.creationDate = creationDate;
    this.accidentDate = accidentDate;
    this.photos = photos;
  }

  public int getClaimId() {
    return this.claimId;
  }

  public void setClaimId(int claimId) {
    this.claimId = claimId;
  }

  public Contract getContract() {
    return this.contract;
  }

  public List<Photo> getPhotos() {
    return this.photos;
  }

  public void setContract(Contract contract) {
    this.contract = contract;
  }

  public String getClaimNum() {
    return this.claimNum;
  }

  public void setPhotos(List<Photo> photos) {
    this.photos = photos;
  }

  public void setClaimNum(String claimNum) {
    this.claimNum = claimNum;
  }

  public String getStatus() {
    return this.status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public OffsetDateTime getCreationDate() {
    return this.creationDate;
  }

  public void setCreationDate(OffsetDateTime creationDate) {
    this.creationDate = creationDate;
  }

  public OffsetDateTime getAccidentDate() {
    return this.accidentDate;
  }

  public void setAccidentDate(OffsetDateTime accidentDate) {
    this.accidentDate = accidentDate;
  }

  @Override
  public String toString() {
    return "{" +
        " claimId='" + getClaimId() + "'" +
        ", contract='" + getContract() + "'" +
        ", photos='" + getPhotos() + "'" +
        ", claimNum='" + getClaimNum() + "'" +
        ", status='" + getStatus() + "'" +
        ", creationDate='" + getCreationDate() + "'" +
        ", accidentDate='" + getAccidentDate() + "'" +
        "}";
  }

}
