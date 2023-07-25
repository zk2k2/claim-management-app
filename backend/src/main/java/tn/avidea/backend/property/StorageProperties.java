package tn.avidea.backend.property;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("storage")
public class StorageProperties {

  private String location = "C:\\Users\\USER\\Documents\\Projects\\claim-management-app\\frontend\\src\\assets\\images\\uploaded";

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

}