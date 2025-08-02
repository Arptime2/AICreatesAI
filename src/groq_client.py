"""
Dedicated module for all interactions with the Groq API.
"""

import os
from groq import Groq


class GroqClient:
    """A client for interacting with the Groq API."""

    def __init__(self):
        self.api_key = os.environ.get("GROQ_API_KEY")
        if not self.api_key:
            raise ValueError("GROQ_API_KEY environment variable not set.")
        self.client = Groq(api_key=self.api_key)

    def generate(
        self, prompt: str, model: str = "llama3-8b-8192"
    ) -> str:
        """Generates a response from the Groq API."""
        chat_completion = self.client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model=model,
        )
        return chat_completion.choices[0].message.content
