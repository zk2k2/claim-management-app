package tn.avidea.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

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
