package com.appraisal.performance_appraisal.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.appraisal.performance_appraisal.dto.EmployeeDTO;
import com.appraisal.performance_appraisal.model.Category;
import com.appraisal.performance_appraisal.model.Employee;
import com.appraisal.performance_appraisal.repositories.EmployeeRepository;

import lombok.AllArgsConstructor;



@Service
@AllArgsConstructor
public class AnalysisService {
    
	
	private EmployeeService employeeService ; 
	static List<Category> categories = List.of(
                new Category("A", 10.0), // Top performers 
                new Category("B", 20.0), // High performers
                new Category("C", 40.0), // Average performers 
                new Category("D", 20.0), // Below average performers 
                new Category("E", 10.0)  // Low performers 
        );
	public Map<String, Object> findAnalysis() {
		// TODO Auto-generated method stub
		 // all the employess 
		 List<EmployeeDTO> employees = employeeService.getAllEmployees();
		// calcualte the actual percentage based on employee table 
		
		 Map<String , Double > actualPercentage = calculateActualPercentage( employees );
		 
		 
		 // calculate the Deviation Based on actualPercentage 
		 Map<String , Double > deviationPercentage = calcualteDeviationPercentage( employees , actualPercentage );
		 
		 
		 
		 
		 // calculate the Revised Employees 
		 List<EmployeeDTO> revisedEmployees = findRevisedEmployees( deviationPercentage , employees );
		Map<String , Object > result = new HashMap<>(); 
		result.put( "actualPercentage", actualPercentage );
		result.put( "deviationPercentage", deviationPercentage );
		result.put( "revisedEmployees" , revisedEmployees );
		
		return result;
	}
	
	

	private List<EmployeeDTO> findRevisedEmployees( Map< String , Double > deviation  , List<EmployeeDTO> employees) {
		// TODO Auto-generated method stub
		List<EmployeeDTO> adjustments = new ArrayList<>();

        
		// Identify overrepresented categories and suggest adjustments
        for (Map.Entry<String, Double> entry : deviation.entrySet()) {
            if (entry.getValue() > 0) { // Overrepresented category
                String category = entry.getKey(); // Category name
                adjustments.addAll(employees.stream()
                        .filter(emp -> emp.getRating().equals(category))// Filter employees 
                        .limit((long) Math.ceil(entry.getValue()))              // Limit adjustments to deviation 
                        .collect(Collectors.toList()));                        // Collect adjusted
            }
        }

        return adjustments;
		}
	private Map<String , Double > calcualteDeviationPercentage(List<EmployeeDTO> employees, Map<String , Double > actualPercentages) {
		// TODO Auto-generated method stub
		
		
		Map<String, Double> deviation = new HashMap<>();

        // Calculate deviation for each category
        for (Category category : categories) {
            double standard = category.getPercentage();            
            double actualPercentage = actualPercentages.getOrDefault(category.getCategoryName(), 0.0); 
            deviation.put(category.getCategoryName(), actualPercentage - standard);  
        }

        try {
            ArrayList <Integer> list = new ArrayList<>();
            //code
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return deviation;

	}
	private Map<String, Double>  calculateActualPercentage(List<EmployeeDTO> employees) {
		// TODO Auto-generated method stub
		  Map<String, Long> countByCategory = employees.stream()
	       .collect(Collectors.groupingBy(EmployeeDTO::getRating, Collectors.counting()));

	      
	        int totalEmployees = employees.size();

	        // Map to store actual percentages for each category
	        Map<String, Double> actualPercentage = new HashMap<>();

	        // Calculate the percentage of employees in each category
	        for (Category category : categories) {
	            long count = countByCategory.getOrDefault(category.getCategoryName(), 0L);
	        
	             double percentage = (double) count / totalEmployees * 100;        
	            actualPercentage.put(category.getCategoryName(), percentage);      
	        }

	        return actualPercentage;
	}
     
	
	
}
