package tn.avidea.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.CommandLineRunner;
import tn.avidea.backend.entity.Claim;
import tn.avidea.backend.entity.Contract;
import tn.avidea.backend.property.StorageProperties;
import tn.avidea.backend.service.ClaimService;
import tn.avidea.backend.service.ContractService;

import java.time.OffsetDateTime;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration

@SpringBootApplication
@EnableAutoConfiguration

public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner() { // this
		// is used to run some
		// code at the start of the
		// application
		return args -> {

			System.out.println("Hello from commandLineRunner");
		};
	}
}
