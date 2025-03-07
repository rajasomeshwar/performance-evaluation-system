# Performance Appraisal System

## Project Overview
The **Performance Appraisal System** is a web application that helps organizations evaluate employee performance using a bell curve analysis. The system fetches and visualizes employee ratings, deviations, and other key metrics, providing insights into performance distribution.

This project consists of two parts:
- **Backend:** A Spring Boot application providing REST APIs for data retrieval and processing.
- **Frontend:** A React.js application for displaying performance analysis charts and employee details.

## Backend API Details
The backend is built using **Spring Boot** and provides RESTful APIs to fetch employee data and performance analysis. API documentation is available via Swagger:

[Swagger API Documentation](http://localhost:8085/swagger-ui/index.html#/)
To See the Api documentation :
  type this :  http://localhost:8085/swagger-ui/index.html#/

### Running the Backend
To run the backend, ensure you have **Maven** installed and configured. Follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/rajasomeshwar/performance-appraisal.git
   cd performance-evaluation-system-main/performance-appraisal
   ```

2. **Configure Database Credentials:**
   Update the `application.properties` file in the `src/main/resources` folder:

   ```properties
   # Database Configuration
   spring.datasource.username=#YourUserName
   spring.datasource.password=#YourPassword
   ```

3. **Build and Run the Application:**
   ```sh
   mvn clean install
   mvn spring-boot:run
   ```

The backend will be available at `http://localhost:8085/`.

---

## Frontend Setup
The frontend is built using **React.js** and connects to the backend for data visualization.

### Running the Frontend

1. **Navigate to the frontend directory:**
   ```sh
   cd frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the React app:**
   ```sh
   npm start
   ```

The frontend will be available at `http://localhost:3000/`.

---

## Features
- **Employee Analysis:** View employee performance using a bell curve.
- **Deviation Analysis:** Compare actual vs. expected performance.
- **Revised Employee Ratings:** Identify employees whose ratings have been modified.
- **Employee Details:** Fetch and display employee information.

## Technologies Used
- **Backend:** Spring Boot, Maven, MySQL
- **Frontend:** React.js, Recharts (for visualization)
- **Database:** MySQL
- **API Documentation:** Swagger

