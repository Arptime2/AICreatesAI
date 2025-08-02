import json
from src.v17.genome import PromptGenome, CriticGenome
from src.v17.groq_client import GroqClient

def intelligent_mutation(genome: PromptGenome, groq_client: GroqClient) -> PromptGenome:
    """Performs intelligent mutation on a PromptGenome using an LLM."""
    prompt = f"""
    You are a prompt engineering expert. Your task is to perform a creative mutation on the following prompt to explore a new direction.

    Original Prompt:
    {genome.__dict__}

    Introduce a single, creative, and potentially beneficial change to one of the prompt's attributes (e.g., persona_description, task_framing, constraints). Do not just add a word; make a meaningful alteration. Output the mutated prompt as a single JSON object.
    """
    response = groq_client.generate(prompt)
    try:
        mutated_data = json.loads(response)
        mutated_data['id'] = f"{genome.id}_mutated"
        return PromptGenome(**mutated_data)
    except (json.JSONDecodeError, TypeError):
        # Fallback to no mutation on failure
        return genome

def intelligent_mutation_critic(genome: CriticGenome, groq_client: GroqClient) -> CriticGenome:
    """Performs intelligent mutation on a CriticGenome using an LLM."""
    prompt = f"""
    You are an expert in AI evaluation. Your task is to perform a creative mutation on the following critic prompt to explore a new evaluation dimension.

    Original Critic:
    {genome.__dict__}

    Introduce a single, creative, and potentially beneficial change to one of the critic's attributes (e.g., evaluation_criteria, scoring_rubric). Do not just add a word; make a meaningful alteration. Output the mutated critic as a single JSON object.
    """
    response = groq_client.generate(prompt)
    try:
        mutated_data = json.loads(response)
        mutated_data['id'] = f"{genome.id}_mutated"
        return CriticGenome(**mutated_data)
    except (json.JSONDecodeError, TypeError):
        # Fallback to no mutation on failure
        return genome
