package com.appraisal.performance_appraisal.exceptions;


public class EmployeeNotFoundException extends RuntimeException {
    public EmployeeNotFoundException(String message)
    {
   	 super(message);
    }
}