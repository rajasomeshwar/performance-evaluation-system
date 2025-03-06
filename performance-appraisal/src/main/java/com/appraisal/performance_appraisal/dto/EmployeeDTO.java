package com.appraisal.performance_appraisal.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// THis Class used to communicate with the JSON 



@Data // used for getter , setter 
@AllArgsConstructor // provides the parametersize constructor 
@NoArgsConstructor // provides the default constructor 
public class EmployeeDTO {
    private Long employeeId;
     //Not Blank is validation when it was converts json to object it checks 
    @NotBlank(message = "Employee name cannot be blank")
    @Size(max = 255, message = "Employee name must be less than 256 characters")
    private String employeeName;

    @NotNull(message = "Rating must be provided")
    @Pattern(regexp = "[A-E]", message = "Rating must be a single character between A and E")
    private String rating; 
}