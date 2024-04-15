package tn.avidea.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import java.util.List;

import java.time.OffsetDateTime;

import jakarta.persistence.Column;

@Entity
@Table(name = "Contract")
public class Contract {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int contractId; // Long

  // @OneToMany(mappedBy = "contract")
  // private List<Claim> claims;

  @Column(name = "contract_num", length = 20)
  private String contractNum;

  @Column(name = "start_date")
  private OffsetDateTime startDate;

  @Column(name = "end_date")
  private OffsetDateTime endDate;

  @Column(name = "insured_name", length = 50)
  private String insuredName;

  @Column(name = "vehicule_registration", length = 15)
  private String vehiculeRegistration;

  protected Contract() {
  }

  public Contract(List<Claim> claims, String contractNum, OffsetDateTime startDate,
      OffsetDateTime endDate,
      String insuredName, String vehiculeRegistration) {
    // this.claims = claims;
    this.contractNum = contractNum;
    this.startDate = startDate;
    this.endDate = endDate;
    this.insuredName = insuredName;
    this.vehiculeRegistration = vehiculeRegistration;
  }

  public int getContractId() {
    return this.contractId;
  }

  public void setContractId(int contractId) {
    this.contractId = contractId;
  }

  // public List<Claim> getClaims() {
  // return this.claims;
  // }

  // public void setClaims(List<Claim> claims) {
  // this.claims = claims;
  // }

  public String getContractNum() {
    return this.contractNum;
  }

  public void setContractNum(String contractNum) {
    this.contractNum = contractNum;
  }

  public OffsetDateTime getStartDate() {
    return this.startDate;
  }

  public void setStartDate(OffsetDateTime startDate) {
    this.startDate = startDate;
  }

  public OffsetDateTime getEndDate() {
    return this.endDate;
  }

  public void setEndDate(OffsetDateTime endDate) {
    this.endDate = endDate;
  }

  public String getInsuredName() {
    return this.insuredName;
  }

  public void setInsuredName(String insuredName) {
    this.insuredName = insuredName;
  }

  public String getVehiculeRegistration() {
    return this.vehiculeRegistration;
  }

  public void setVehiculeRegistration(String vehiculeRegistration) {
    this.vehiculeRegistration = vehiculeRegistration;
  }

  @Override
  public String toString() {
    return "{" +
        " contractId='" + getContractId() + "'" +
        ", contractNum='" + getContractNum() + "'" +
        ", startDate='" + getStartDate() + "'" +
        ", endDate='" + getEndDate() + "'" +
        ", insuredName='" + getInsuredName() + "'" +
        ", vehiculeRegistration='" + getVehiculeRegistration() + "'" +
        "}";
  }

}
