from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

from services.ai_model import analyze_resume

app = FastAPI(
    title="Resume Analyzer AI Service",
    description="AI Microservice for Resume Analyzer",
    version="1.0.0"
)


class ResumeRequest(BaseModel):

    name: str

    summary: str

    skills: List[str]

    education: str

    projects: str

    experience: str

    internships: str

    certifications: str



@app.get("/")
def root():
    return {
        "message": "Resume Analyzer AI Service Running 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "UP"
    }

@app.post("/analyze")
def analyze(request: ResumeRequest):

    resume_text = f"""
Name: {request.name}

Summary:
{request.summary}

Skills:
{", ".join(request.skills)}

Education:
{request.education}

Projects:
{request.projects}

Experience:
{request.experience}

Internships:
{request.internships}

Certifications:
{request.certifications}
"""

    response = analyze_resume(resume_text)

    return {
        "analysis": response
    }

