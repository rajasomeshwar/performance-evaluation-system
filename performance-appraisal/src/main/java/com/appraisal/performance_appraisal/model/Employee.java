package com.appraisal.performance_appraisal.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
 *   Employee : 
 *    Id : Number 
 *    Name : Characters 
 *    Rating : (  A, B, C, D, E )
 */

@Entity // Creating the table in db 
@Data // used to create the setters and getters
@AllArgsConstructor // automatically creates the constructor with parameters
@NoArgsConstructor // 
public class Employee {
   
	@Id
	private long employeeId ; 
   
   
	@NotBlank(message = "Name should be empty ")
    @Column(nullable = false )
	@Size( max = 255 , message = "Employee name must be less than 255 characters ")
   private String employeeName;
   
	  @NotNull(message = "Rating must be provided")
	    @Pattern(regexp = "[A-E]", message = "Rating must be a single character between A and E") // Corrected regex
	    @Column(name = "rating", nullable = false, length = 1)
      private String Rating ; 
}
