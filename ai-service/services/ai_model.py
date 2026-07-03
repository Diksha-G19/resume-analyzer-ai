from transformers import pipeline
import json

generator = pipeline(
    "text-generation",
    model="TinyLlama/TinyLlama-1.1B-Chat-v1.0"
)


def analyze_resume(resume_text):

    prompt = f"""
### Instruction:

You are an ATS Resume Reviewer.

Analyze the following resume.

Return ONLY valid JSON.

The JSON format must be:

{{
  "strengths": [
    "...",
    "..."
  ],
  "weaknesses": [
    "...",
    "..."
  ],
  "suggestions": [
    "...",
    "..."
  ]
}}

Rules:
- Return JSON only.
- Do not add explanations.
- Do not write markdown.
- Do not write ```json.
- Every value must be a JSON string.

Resume:

{resume_text}

### Response:
"""

    response = generator(
        prompt,
        max_new_tokens=300,
        do_sample=True,
        temperature=0.3
    )

    generated = response[0]["generated_text"]
    answer = generated.split("### Response:")[-1].strip()
    try:
        return json.loads(answer)
    except Exception:
        return {
            "strengths": [],
            "weaknesses": [],
            "suggestions": [
                "AI could not generate valid JSON."
            ]
        }