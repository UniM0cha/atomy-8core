package me.solstice.atomy_8core_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.session.SessionAutoConfiguration;

@SpringBootApplication(exclude = {SessionAutoConfiguration.class})
public class Atomy8coreApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(Atomy8coreApiApplication.class, args);
	}

}
