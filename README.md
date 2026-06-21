# Smart Resume Screening & Job Matching Portal

## Overview

The Smart Resume Screening & Job Matching Portal is a full-stack web application that automates the recruitment process by analyzing resumes, extracting skills, matching candidates with job requirements, and ranking applicants based on compatibility scores.

## Features

* Upload and parse PDF resumes
* Automatic skill extraction from resumes
* Job posting and management
* Resume-to-job matching with score calculation
* Candidate ranking based on match percentage
* Skill-based resume search
* Dashboard analytics
* Resume and job CRUD operations

## Tech Stack

### Frontend

* React.js
* HTML
* CSS
* Axios

### Backend

* Java
* Spring Boot
* REST APIs

### Database

* MySQL

### Libraries & Tools

* Apache PDFBox
* JDBC
* Maven

## System Workflow

1. Upload a resume in PDF format.
2. Extract text and identify relevant technical skills.
3. Store resume details in the database.
4. Create job postings with required skills.
5. Match resumes against job requirements.
6. Calculate match scores and rank candidates.
7. Search resumes based on specific skills.
8. View analytics through the dashboard.

## API Endpoints

### Resume Management

* POST `/api/resume/upload`
* GET `/api/resume`
* DELETE `/api/resume/{id}`
* GET `/api/resume/view/{id}`

### Job Management

* POST `/api/resume/job`
* GET `/api/resume/jobs`

### Matching

* GET `/api/resume/match/{resumeId}/{jobId}`
* GET `/api/resume/match-results`
* GET `/api/resume/top-matches/{jobId}`

### Search

* GET `/api/resume/search?skill={skill}`

### Dashboard

* GET `/api/resume/dashboard`

## Installation

### Backend Setup

1. Clone the repository
2. Configure MySQL database
3. Update database credentials in `application.properties`
4. Run the Spring Boot application

### Frontend Setup

```bash
npm install
npm start
```

The frontend will run on:

```text
http://localhost:3000
```

The backend will run on:

```text
http://localhost:8081
```

## Future Enhancements

* AI-powered resume analysis
* JWT authentication and authorization
* Email notifications
* Advanced ATS scoring algorithms
* Resume recommendations
* Interview scheduling module

## Author

Madhavi Powar

Built as a Full-Stack Development project using Java, Spring Boot, React.js, and MySQL.

