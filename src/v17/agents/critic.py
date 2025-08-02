from src.v17.genome import CriticGenome
from src.v17.groq_client import GroqClient

class CriticAgent:
    """Evaluates code based on a CriticGenome."""

    def __init__(self):
        self.groq_client = GroqClient()

    def evaluate_code(self, critic: CriticGenome, code: str) -> float:
        """Evaluates code based on a CriticGenome."""
        prompt_text = f"{critic.template}\n\nCode to evaluate:\n```\n{code}```\n\n{critic.scoring_rubric}"
        response = self.groq_client.generate(prompt_text)
        try:
            return float(response)
        except ValueError:
            return 0.0
