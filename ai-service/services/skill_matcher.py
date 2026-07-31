import re

COMMON_SKILLS = {
    "java",
    "python",
    "c",
    "c++",
    "spring",
    "spring boot",
    "hibernate",
    "mysql",
    "postgresql",
    "mongodb",
    "sql",
    "git",
    "github",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "gcp",
    "redis",
    "kafka",
    "rabbitmq",
    "rest",
    "rest api",
    "microservices",
    "html",
    "css",
    "javascript",
    "react",
    "angular",
    "node.js",
    "express",
    "flask",
    "fastapi",
    "pandas",
    "numpy",
    "scikit-learn",
    "tensorflow",
    "pytorch",
    "power bi",
    "tableau",
    "linux"
}

def extract_skills(text):

    text = text.lower()

    found = set()

    for skill in COMMON_SKILLS:

        pattern = r"\b" + re.escape(skill) + r"\b"

        if re.search(pattern, text):
            found.add(skill)

    return sorted(found)

def build_resume_profile(resume):

    return f"""
Skills:
{' '.join(resume.skills or [])}

Projects:
{resume.projects or ""}

Experience:
{resume.experience or ""}

Internships:
{resume.internships or ""}

Certifications:
{resume.certifications or ""}
"""

SKILL_ALIASES = {
    "postgres": "postgresql",
    "postgresql": "postgresql",

    "powerbi": "power bi",
    "power bi": "power bi",

    "restful api": "rest api",
    "restful apis": "rest api",
    "rest api": "rest api",

    "node": "node.js",
    "nodejs": "node.js",
    "node.js": "node.js",

    "js": "javascript",
    "javascript": "javascript",

    "spring": "spring boot",
    "spring boot": "spring boot"
}

def normalize_skill(skill):
    return SKILL_ALIASES.get(skill.lower(), skill.lower())

def compare_skills(resume_skills, jd_skills):

    # Normalize everything to lowercase
    resume = {normalize_skill(skill) for skill in resume_skills}
    jd = {normalize_skill(skill) for skill in jd_skills}

    matched = sorted(resume.intersection(jd))
    missing = sorted(jd - resume)

    return matched, missing

def calculate_match_percentage(matched, jd_skills):

    if not jd_skills:
        return 100

    return round((len(matched) / len(jd_skills)) * 100)

def get_resume_skills(resume):

    profile = build_resume_profile(resume)

    return extract_skills(profile)