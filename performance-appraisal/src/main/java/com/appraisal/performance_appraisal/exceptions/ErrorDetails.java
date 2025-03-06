package com.appraisal.performance_appraisal.exceptions;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
// this class used for customsize response back to user 


@AllArgsConstructor
@Data
public class ErrorDetails {
 private LocalDateTime timestamp;
 private String message;
 private String details;

}
