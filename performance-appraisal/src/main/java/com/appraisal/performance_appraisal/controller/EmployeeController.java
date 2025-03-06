package com.appraisal.performance_appraisal.controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appraisal.performance_appraisal.dto.EmployeeDTO;
import com.appraisal.performance_appraisal.service.EmployeeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
// used for getting requests 
@RestController 
@RequestMapping("/api/employee")
@Slf4j
@AllArgsConstructor
@CrossOrigin("http://localhost:3000/")
public class EmployeeController {
	
  private EmployeeService employeeService ; 
	
  // add the employee Data 
  @PostMapping
  @Operation(summary = "Create a new employee", description = "Creates a new employee.")
  @ApiResponse(responseCode = "201", description = "Employee created successfully")
  @ApiResponse(responseCode = "400", description = "Invalid input")
  public  ResponseEntity<EmployeeDTO> createEmployee( @Valid @RequestBody EmployeeDTO employeeData ) { 
	  
	  
	 EmployeeDTO createdData = employeeService.createEmployee( employeeData );  
	  return new ResponseEntity<>(  createdData , HttpStatus.CREATED);
  }
  @GetMapping
  @Operation(summary = "Fetch the all employee "  , description = "Details of all employees ") 
  @ApiResponse( responseCode = "200" , description = "Returned Employee Details ")
  public ResponseEntity<List<EmployeeDTO>> getAllEmployees(){
	 List<EmployeeDTO> employeesData = employeeService.getAllEmployees();
	 return new ResponseEntity<>( employeesData , HttpStatus.OK);
  }
  @GetMapping("/{id}")
  @Operation(summary = "Fetch the Specfic employee Details " , description = "Details of an employee ")
  public ResponseEntity<EmployeeDTO> getEmployeeWithId( @PathVariable long id ) { 
	  EmployeeDTO employeeData = employeeService.getEmployeeById( id ) ;
		 return new ResponseEntity<>( employeeData , HttpStatus.OK);
  }
  @GetMapping( "/testApi")
  @Operation(summary = "Test the Controller ", description = "Used for controller is working or not ")
  public String testMethod() { 
     log.trace("Currently running the test method ");
     log.debug("Debug is on ");
	  return "It's Was Working";
  }
}
