from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import re

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

import re

HEADINGS = [
    "Strengths",
    "Weaknesses",
    "Suggestions"
]

def extract_section(text, heading):

    # Remove markdown formatting
    text = text.replace("**", "").replace("##", "").replace("###", "")

    headings = "|".join(HEADINGS)

    pattern = rf"{heading}\s*:?\s*(.*?)(?=\n(?:{headings})\s*:?\s*|\Z)"

    match = re.search(
        pattern,
        text,
        re.DOTALL | re.IGNORECASE
    )

    if not match:
        return []

    section = match.group(1).strip()

    items = []

    for line in section.splitlines():

        line = line.strip()

        if not line:
            continue

        # Remove -, *, •
        line = re.sub(r"^[-*•]\s*", "", line)

        # Remove 1. 2. 3.
        line = re.sub(r"^\d+\.\s*", "", line)

        if line:
            items.append(line)

    return items

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
        "strengths": extract_section(response, "Strengths"),
        "weaknesses": extract_section(response, "Weaknesses"),
        "suggestions": extract_section(response, "Suggestions")
    }

