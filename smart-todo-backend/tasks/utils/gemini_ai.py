import os
import json
import re
import google.generativeai as genai
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_task_suggestion(title, context=""):
    now = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")  # e.g., 2025-07-07T16:20:00Z

    prompt = f"""
You are a smart task assistant.
Current UTC time is: {now}.

Given the following task title and context, return a JSON object with:

1. An enhanced task description
2. A realistic priority score between 0–100
3. A future deadline (in ISO 8601 format like "2025-07-09T18:00:00Z")
4. A suitable category or tag
5. Estimated hours required to complete the task

Respond ONLY in this exact JSON format — no markdown, no explanation:

{{
  "enhancedDescription": "...",
  "priority": 0-100,
  "deadline": "YYYY-MM-DDTHH:MM:SSZ",
  "category": "...",
  "hoursRequired": number
}}

Task Title: "{title}"
Context: "{context}"
"""

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    raw_text = response.text.strip()

    # ✅ Remove Markdown formatting if it sneaks in
    cleaned = re.sub(r"^```json|^```|```$", "", raw_text).strip()

    try:
        suggestion = json.loads(cleaned)
    except Exception as e:
        suggestion = {
            "error": "Gemini response could not be parsed",
            "raw": cleaned,
            "exception": str(e)
        }

    return suggestion
