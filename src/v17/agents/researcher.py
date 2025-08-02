import json
from src.v17.genome import PromptGenome, CriticGenome
from src.v17.memory.cognition_archive import CognitionArchive
from src.groq_client import GroqClient

class ResearcherAgent:
    """Generates new genomes based on the Cognition Archive."""

    def __init__(self, cognition_archive: CognitionArchive):
        self.cognition_archive = cognition_archive
        self.groq_client = GroqClient()

    def generate_prompt_genome(self, id: str) -> PromptGenome:
        """Generates a new PromptGenome based on the Cognition Archive."""
        knowledge = "\n".join(self.cognition_archive.get_knowledge())
        prompt_text = f"Based on the following knowledge:\n{knowledge}\n\nGenerate a new PromptGenome in JSON format with the following keys: id, template, persona_description, task_framing, output_format_instruction, constraints."
        response = self.groq_client.generate(prompt_text)
        try:
            data = json.loads(response)
            data['id'] = id
            return PromptGenome(**data)
        except (json.JSONDecodeError, TypeError):
            return PromptGenome(id=id, template="", persona_description="", task_framing="", output_format_instruction="", constraints=[])

    def generate_critic_genome(self, id: str) -> CriticGenome:
        """Generates a new CriticGenome based on the Cognition Archive."""
        knowledge = "\n".join(self.cognition_archive.get_knowledge())
        prompt_text = f"Based on the following knowledge:\n{knowledge}\n\nGenerate a new CriticGenome in JSON format with the following keys: id, template, evaluation_criteria, scoring_rubric."
        response = self.groq_client.generate(prompt_text)
        try:
            data = json.loads(response)
            data['id'] = id
            return CriticGenome(**data)
        except (json.JSONDecodeError, TypeError):
            return CriticGenome(id=id, template="", evaluation_criteria=[], scoring_rubric="")
