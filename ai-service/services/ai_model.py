from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import json
import re

MODEL_NAME = "Qwen/Qwen2.5-1.5B-Instruct"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    torch_dtype="auto",
    device_map="cpu"
)

def load_prompt():

    with open(
            "prompts/resume_prompt.txt",
            "r",
            encoding="utf-8"
    ) as file:

        return file.read()

def load_match_prompt():

    with open(
            "prompts/job_match_prompt.txt",
            "r",
            encoding="utf-8"
    ) as file:

        return file.read()
    
def analyze_resume(resume_text):

    template = load_prompt()
    prompt = template.replace("{resume}", resume_text)

    messages = [
        {
            "role": "system",
            "content": "You are an experienced ATS Resume Reviewer."
        },
        {
            "role": "user",
            "content": prompt
        }
    ]

    text = tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True
    )

    inputs = tokenizer(text, return_tensors="pt")

    outputs = model.generate(
        **inputs,
        max_new_tokens=200,
        temperature=0.3,
        do_sample=True
    )

    generated_ids = outputs[0][inputs["input_ids"].shape[1]:]
    answer = tokenizer.decode(
        generated_ids, skip_special_tokens=True).strip()

    
    return answer

def generate_recommendations(
    resume,
    job_description,
    matched_skills,
    missing_skills):

    template = load_match_prompt()

    prompt = template \
    .replace("{summary}", resume.summary or "") \
    .replace("{skills}", ", ".join(resume.skills or [])) \
    .replace("{projects}", resume.projects or "") \
    .replace("{experience}", resume.experience or "") \
    .replace("{matchedSkills}", ", ".join(matched_skills)) \
    .replace("{missingSkills}", ", ".join(missing_skills)) \
    .replace("{jobDescription}", job_description)

    messages = [
        {
            "role": "system",
            "content": "You are an expert ATS Resume Matcher."
        },
        {
            "role": "user",
            "content": prompt
        }
    ]

    text = tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True
    )

    inputs = tokenizer(text, return_tensors="pt")

    outputs = model.generate(
        **inputs,
        max_new_tokens=300,
        temperature=0.2,
        do_sample=False
    )

    generated_ids = outputs[0][inputs["input_ids"].shape[1]:]

    answer = tokenizer.decode(
        generated_ids,
        skip_special_tokens=True
    ).strip()

    print(answer)

    # Extract JSON from the model output
    match = re.search(r"\{.*\}", answer, re.DOTALL)

    if not match:
        raise Exception("Model did not return valid JSON.")

    data = json.loads(match.group())

    recommendations = []

    for item in data.get("recommendations", []):

        if isinstance(item, dict):

            if "description" in item:
                recommendations.append(item["description"])

            elif "improvement" in item:
                recommendations.append(item["improvement"])

        else:

            recommendations.append(str(item))

    return {
        "recommendations": recommendations
    }