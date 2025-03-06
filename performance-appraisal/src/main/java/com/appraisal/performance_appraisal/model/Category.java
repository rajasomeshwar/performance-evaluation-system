package com.appraisal.performance_appraisal.model;

import lombok.AllArgsConstructor;
import lombok.Data;

/*
 *  Category :
 *    categoryName : A , B , C , D , E 
 *    Percentage : % 
 *    
 */
@Data
@AllArgsConstructor
public class Category {
    
	private String categoryName ; 
	private Double percentage ; 
}
