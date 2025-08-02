import json
from typing import Tuple
from src.v17.genome import PromptGenome, CriticGenome
from src.groq_client import GroqClient

def intelligent_crossover(parent1: PromptGenome, parent2: PromptGenome, groq_client: GroqClient) -> PromptGenome:
    """Performs intelligent crossover on two PromptGenomes using an LLM."""
    prompt = f"""
    You are a prompt engineering expert. Your task is to perform a crossover operation on two parent prompts to create a superior child prompt.

    Parent 1:
    {parent1.__dict__}

    Parent 2:
    {parent2.__dict__}

    Combine the best attributes of both parents to create a new child prompt. The child should inherit the most effective persona, task framing, and constraints. Output the child prompt as a single JSON object.
    """
    response = groq_client.generate(prompt)
    try:
        child_data = json.loads(response)
        child_data['id'] = f"{parent1.id}_{parent2.id}_child"
        return PromptGenome(**child_data)
    except (json.JSONDecodeError, TypeError):
        # Fallback to a simple crossover on failure
        child_data = parent1.__dict__.copy()
        child_data['id'] = f"{parent1.id}_{parent2.id}_child"
        return PromptGenome(**child_data)

def intelligent_crossover_critic(parent1: CriticGenome, parent2: CriticGenome, groq_client: GroqClient) -> CriticGenome:
    """Performs intelligent crossover on two CriticGenomes using an LLM."""
    prompt = f"""
    You are an expert in AI evaluation. Your task is to perform a crossover operation on two parent critic prompts to create a superior child critic.

    Parent 1:
    {parent1.__dict__}

    Parent 2:
    {parent2.__dict__}

    Combine the best attributes of both parents to create a new child critic. The child should inherit the most effective evaluation criteria and scoring rubric. Output the child critic as a single JSON object.
    """
    response = groq_client.generate(prompt)
    try:
        child_data = json.loads(response)
        child_data['id'] = f"{parent1.id}_{parent2.id}_child"
        return CriticGenome(**child_data)
    except (json.JSONDecodeError, TypeError):
        # Fallback to a simple crossover on failure
        child_data = parent1.__dict__.copy()
        child_data['id'] = f"{parent1.id}_{parent2.id}_child"
        return CriticGenome(**child_data)
