import os
from src.v17.memory.cognition_archive import CognitionArchive
from src.v17.memory.prompt_db import PromptDB
from src.v17.memory.critic_db import CriticDB
from src.v17.agents.researcher import ResearcherAgent
from src.v17.agents.engineer import EngineerAgent
from src.v17.agents.critic import CriticAgent
from src.v17.evolution.selection import roulette_wheel_selection
from src.v17.evolution.crossover import intelligent_crossover, intelligent_crossover_critic
from src.v17.evolution.mutation import intelligent_mutation, intelligent_mutation_critic
from src.v17.evolution.fitness import calculate_prompt_fitness, calculate_critic_fitness
from src.v17.groq_client import GroqClient

def main():
    """The main entry point for the V17 system."""

    if not os.environ.get("GROQ_API_KEY"):
        raise ValueError("GROQ_API_KEY environment variable not set.")

    # Initialize Groq client
    groq_client = GroqClient()

    # Initialize databases and archives
    cognition_archive = CognitionArchive("src/v17/memory/cognition_archive.md")
    prompt_db = PromptDB("src/v17/memory/prompt_db.json")
    critic_db = CriticDB("src/v17/memory/critic_db.json")

    # Initialize agents
    researcher = ResearcherAgent(cognition_archive)
    engineer = EngineerAgent()
    critic = CriticAgent()

    # Initialize populations if they are empty
    if not prompt_db.get_all():
        for i in range(10):
            prompt_db.add(researcher.generate_prompt_genome(f"prompt_{i}"))
    
    if not critic_db.get_all():
        for i in range(10):
            critic_db.add(researcher.generate_critic_genome(f"critic_{i}"))

    # Run a single generation
    prompts = prompt_db.get_all()
    critics = critic_db.get_all()

    # Evaluate prompts
    prompt_metrics = []
    for p in prompts:
        code = engineer.generate_code(p)
        metrics = engineer.run_tests_and_get_metrics(code)
        prompt_metrics.append(metrics)
        critic_scores = [critic.evaluate_code(c, code) for c in critics]
        p.fitness_score = calculate_prompt_fitness(p, metrics, critic_scores)

    # Evolve prompts
    selected_prompts = roulette_wheel_selection(prompts, 10)
    new_prompts = []
    for i in range(0, 10, 2):
        parent1, parent2 = selected_prompts[i], selected_prompts[i+1]
        child = intelligent_crossover(parent1, parent2, groq_client)
        new_prompts.append(intelligent_mutation(child, groq_client))
    
    for p in new_prompts:
        prompt_db.add(p)

    # Evaluate critics
    for c in critics:
        critic_scores = [critic.evaluate_code(c, engineer.generate_code(p)) for p in prompts]
        c.fitness_score = calculate_critic_fitness(c, prompt_metrics, critic_scores)

    # Evolve critics
    selected_critics = roulette_wheel_selection(critics, 10)
    new_critics = []
    for i in range(0, 10, 2):
        parent1, parent2 = selected_critics[i], selected_critics[i+1]
        child = intelligent_crossover_critic(parent1, parent2, groq_client)
        new_critics.append(intelligent_mutation_critic(child, groq_client))

    for c in new_critics:
        critic_db.add(c)

if __name__ == "__main__":
    main()
