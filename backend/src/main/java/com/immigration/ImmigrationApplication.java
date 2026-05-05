package com.immigration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ImmigrationApplication {

    public static void main(String[] args) {
        SpringApplication.run(ImmigrationApplication.class, args);
        System.out.println("\n==============================================");
        System.out.println("Immigration Management System Started!");
        System.out.println("API URL: http://qunlkhchquct-production.up.railway.app/api");
        System.out.println("==============================================\n");
    }
}
