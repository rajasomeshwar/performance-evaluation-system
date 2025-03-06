package com.appraisal.performance_appraisal.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appraisal.performance_appraisal.service.AnalysisService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/api/analysis")
@AllArgsConstructor
public class AnalysisController {
	 
	 private AnalysisService analysisServcice ; 
	 
	// all together we can pass the data 
	@GetMapping
	@Operation(summary = "This used for Analysis the Employee Details " , 
	description = "Usde for analysis the employee Data based on the standard percentage ")
	public ResponseEntity< Map<String , Object > > getAnalysis() { 
		Map<String , Object > data = analysisServcice.findAnalysis();
		return new ResponseEntity<>( data , HttpStatus.OK);
	}

}
