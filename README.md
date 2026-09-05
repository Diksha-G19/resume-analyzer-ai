
# Resume Analyzer AI

An AI-powered full-stack web application that analyzes resumes, extracts important information, evaluates resume strengths and weaknesses, and matches resumes with job descriptions.

The system combines a React frontend, Spring Boot backend, PostgreSQL database, and a FastAPI-based AI service to provide automated resume analysis and job matching.


##  Features

###  User Authentication
- User registration and login
- JWT-based authentication
- Protected application pages
- Secure API access

###  Resume Management
- Upload resumes
- Store resume information in PostgreSQL
- View uploaded resumes
- Select a resume for analysis or job matching

###  Resume Parsing
The application extracts important information from uploaded resumes, including:

- Name
- Email
- Phone number
- Skills
- Education
- Projects
- Experience
- Internships
- Certifications
- Professional summary

###  AI Resume Analysis

The application analyzes a resume and provides:

- **Strengths**
- **Weaknesses**
- **Suggestions**

The analysis is generated using the AI service.

###  Job Match

Users can select a resume and provide a job description.

The system calculates:

- Match percentage
- Matched skills
- Missing skills
- Recommendations

This helps users understand how well their resume matches a particular job.

###  Dashboard

The dashboard provides an overview of the user's resumes, including:

- Number of uploaded resumes
- Latest resume ID


#  System Architecture

```text
                    ┌─────────────────────┐
                    │     React Frontend  │
                    │      + Vite         │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │   Spring Boot       │
                    │      Backend        │
                    │                     │
                    │ Authentication      │
                    │ Resume Management   │
                    │ Resume Parsing      │
                    │ Job Matching        │
                    └───────┬───────┬─────┘
                            │       │
                            │       │
                            ▼       ▼
                    ┌──────────┐  ┌──────────────┐
                    │PostgreSQL│  │ FastAPI      │
                    │ Database │  │ AI Service   │
                    └──────────┘  │              │
                                  │ Transformers │
                                  │ / LLM        │
                                  └──────────────┘
````

---

#  Application Workflow

## 1. User Registration/Login

The user creates an account or logs in.

```text
User
 ↓
React Frontend
 ↓
Spring Boot Backend
 ↓
JWT Authentication
 ↓
Authenticated User
```

---

## 2. Resume Upload

```text
User selects PDF
        ↓
React Frontend
        ↓
Spring Boot Backend
        ↓
Resume processing
        ↓
Text extraction
        ↓
PostgreSQL
```

The extracted resume text is stored and can later be used for analysis and job matching.

---

## 3. Resume Analysis

```text
User selects resume
        ↓
Resume Analysis Page
        ↓
Spring Boot Backend
        ↓
Resume Parser
        ↓
AI Service
        ↓
AI-generated analysis
        ↓
Frontend
        ↓
Strengths
Weaknesses
Suggestions
```

The result is stored in the browser session so that it remains available while navigating through the application.

---

## 4. Job Matching

```text
User selects resume
        ↓
User enters Job Description
        ↓
React Frontend
        ↓
Spring Boot Backend
        ↓
Resume + Job Description
        ↓
AI Service
        ↓
Skill Matching / AI Analysis
        ↓
Match Result
```

The result includes:

```text
Match Percentage
Matched Skills
Missing Skills
Recommendations
```

---

#  Technologies Used

## Frontend

* React
* Vite
* JavaScript
* Tailwind CSS
* React Router
* Axios

### Why React?

React provides a component-based architecture for building a responsive and interactive user interface.

---

## Backend

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Security
* JWT
* Maven

### Why Spring Boot?

Spring Boot is used to build the REST APIs and handle the main application logic.

It manages:

* Authentication
* Resume APIs
* Database operations
* Resume processing
* Communication with the AI service
* Job matching

---

## Database

### PostgreSQL

PostgreSQL is used to store application data such as:

* Users
* Resumes
* Resume metadata
* Extracted resume information

Spring Data JPA is used for database interaction.

---

## AI Service

### FastAPI

FastAPI provides a lightweight Python-based API for AI-related operations.

The Spring Boot backend communicates with the FastAPI service when AI processing is required.

### Transformers / LLM

Transformer-based models are used for natural language processing and AI-powered resume analysis.

The AI service is responsible for processing resume and job-description information and generating useful insights.

---

#  Authentication

The application uses **JWT (JSON Web Token)** authentication.

The basic flow is:

```text
Login
  ↓
Spring Boot verifies credentials
  ↓
JWT generated
  ↓
Frontend stores token
  ↓
Token sent with protected API requests
  ↓
Spring Security validates token
  ↓
Request allowed
```

JWT allows the backend to verify authenticated users without maintaining a traditional server-side login session.

---

#  Project Structure

```text
resume-analyzer-ai/
│
├── ai-service/
│   └── FastAPI AI service
│
├── backend-java/
│   └── resume-analyzer-backend/
│       ├── src/
│       │   └── main/
│       │       └── java/
│       │           └── com/
│       │               └── diksha/
│       │                   └── resumeanalyzer/
│       │
│       └── pom.xml
│
├── resume-analyzer-frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│
├── .gitignore
└── README.md
```

---

#  Main Application Modules

| Module          | Responsibility                             |
| --------------- | ------------------------------------------ |
| Authentication  | Registration, login and JWT authentication |
| Resume Upload   | Upload and process resumes                 |
| Resume Parser   | Extract information from resume text       |
| Resume Analysis | Generate AI-based resume insights          |
| Job Match       | Compare resume with job description        |
| Dashboard       | Display resume statistics                  |
| My Resumes      | Display user's uploaded resumes            |
| AI Service      | Perform AI/NLP processing                  |

---

#  Resume Parsing Approach

The resume parser uses text processing and pattern matching to extract structured information.

For example:

### Email

A regular expression is used to detect email addresses.

### Phone

A regular expression is used to detect Indian phone numbers.

### Skills

The application maintains a predefined skill dictionary containing technologies such as:

```text
Java
Python
Spring Boot
PostgreSQL
MySQL
Git
GitHub
Docker
AWS
React
Machine Learning
TensorFlow
PyTorch
Power BI
Tableau
```

The resume text is checked against the skill dictionary to identify relevant skills.

### Sections

The parser identifies common resume sections such as:

```text
Education
Experience
Projects
Internships
Certifications
Summary
```

It collects the content belonging to each section until another recognized heading is encountered.

---

#  Job Matching

The job matching system compares the skills identified from the resume with skills identified from the job description.

For example:

```text
Resume Skills:
Java
Git
GitHub
Python

Job Skills:
Java
Git
SQL

Matched:
Java
Git

Missing:
SQL
```

The system then generates a match percentage and recommendations.

---

#  Application Pages

### Dashboard

Displays:

* Uploaded resume count
* Latest resume ID

### Upload Resume

Allows users to upload a resume.

### My Resumes

Displays the resumes uploaded by the logged-in user.

### Resume Analysis

Displays:

```text
Strengths
Weaknesses
Suggestions
```

### Job Match

Allows the user to:

1. Select a resume
2. Enter a job description
3. Analyze the job match
4. View matched skills
5. View missing skills
6. View recommendations

---

#  Setup

## Prerequisites

Make sure the following are installed:

* Java
* Maven
* Node.js
* npm
* Python
* PostgreSQL

---

#  Running the Backend

Navigate to the backend directory:

```bash
cd backend-java/resume-analyzer-backend
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

---

#  Running the AI Service

Navigate to the AI service directory:

```bash
cd ai-service
```

Create/activate the Python virtual environment if required and install the dependencies.

Then start the FastAPI application using the project's configured command.

---

#  Running the Frontend

Navigate to:

```bash
cd resume-analyzer-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will then be available through the Vite development server.

---

#  Database Configuration

Create a PostgreSQL database for the application.

Configure the database connection in the Spring Boot application's configuration.

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/resume_analyzer
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

Do not commit actual database credentials or secret keys to GitHub.

---

#  Security

Sensitive information should be stored using environment variables or local configuration files.

The repository ignores:

```text
.env
```

and generated/build files such as:

```text
target/
node_modules/
dist/
```

Uploaded resume files are also excluded from version control.

---

#  Future Improvements

Possible future enhancements include:

* Persistent storage of AI analysis results
* More advanced resume section extraction
* Improved skill/entity recognition
* Better ATS scoring
* Job recommendation system
* Multiple resume formats
* Resume improvement suggestions using LLMs
* Resume ranking
* More advanced semantic similarity between resumes and job descriptions
* Cloud deployment
* Analytics dashboard
* Resume version comparison

---

#  Project Objective

The main objective of Resume Analyzer AI is to simplify the resume evaluation process by combining traditional resume parsing with AI-based analysis.

The application helps users:

* Understand their resume strengths
* Identify weaknesses
* Improve their resumes
* Compare their skills with job requirements
* Identify missing skills
* Receive personalized recommendations

---

#  Author

**Diksha Gupta**

GitHub:

**Diksha-G19**

---

#  Project

**Resume Analyzer AI**

A full-stack AI-powered resume analysis and job matching application built using:

```text
React
Spring Boot
PostgreSQL
FastAPI
Transformers / LLM
JWT
```


