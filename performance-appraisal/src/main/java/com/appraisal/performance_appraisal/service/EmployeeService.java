package com.appraisal.performance_appraisal.service;

import org.springframework.stereotype.Service;

import com.appraisal.performance_appraisal.dto.EmployeeDTO;
import com.appraisal.performance_appraisal.exceptions.EmployeeExistsException;
import com.appraisal.performance_appraisal.exceptions.EmployeeNotFoundException;
import com.appraisal.performance_appraisal.model.Employee;
import com.appraisal.performance_appraisal.repositories.EmployeeRepository;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;



import lombok.AllArgsConstructor; // Keep using AllArgsConstructor
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor // Use AllArgsConstructor for constructor injection
@Transactional // Add transactional to manage the database
public class EmployeeService {

    private final EmployeeRepository employeeRepo; // Corrected typo in variable name

    public EmployeeDTO createEmployee(@Valid EmployeeDTO employeeData) {
    	
        // Check if employee ID already exists. findById returns an Optional
        if (employeeRepo.findById(employeeData.getEmployeeId()).isPresent()) {
            throw new EmployeeExistsException("EmployeeId " + employeeData.getEmployeeId() + " already exists.");
        }
        Employee employee = new Employee();
        employee.setEmployeeId(employeeData.getEmployeeId()); 
        employee.setEmployeeName(employeeData.getEmployeeName());
        employee.setRating(employeeData.getRating());
        employee = employeeRepo.save(employee);
        return convertToDTO(employee);
    }

    
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepo.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
 
    public EmployeeDTO getEmployeeById(Long employeeId) {
    
        return employeeRepo.findById(employeeId)
                .map(this::convertToDTO)  
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found with id: " + employeeId));
    }

    
    public List<EmployeeDTO> getEmployeesByCategory(String category) {
        return employeeRepo.findAll().stream()
                .filter(e -> e.getRating().equals(category))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public EmployeeDTO updateEmployeeRating(Long employeeId, String newRating) {
        return employeeRepo.findById(employeeId)
                .map(employee -> {
                    employee.setRating(newRating);
                    return convertToDTO(employeeRepo.save(employee));
                })
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found with id: " + employeeId));
    }

    // used to convert the employee Entity to Employee Data Transfer Object
    private EmployeeDTO convertToDTO(Employee employee) {
        return new EmployeeDTO(employee.getEmployeeId(), employee.getEmployeeName(), employee.getRating());
    }
}
