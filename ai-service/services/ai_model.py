from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

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

    print("\n========== RAW MODEL OUTPUT ==========\n")
    print(answer)
    print("\n======================================\n")
    return answer