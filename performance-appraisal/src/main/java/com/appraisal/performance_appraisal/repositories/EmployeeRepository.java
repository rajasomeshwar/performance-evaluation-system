package com.appraisal.performance_appraisal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appraisal.performance_appraisal.model.Employee;

public interface EmployeeRepository extends JpaRepository < Employee , Long> {

}
