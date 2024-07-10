package com.nikoverg.DB.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {
	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(BackendApplication.class);
		application.setAdditionalProfiles("default");
		application.run(args);
	}
}

