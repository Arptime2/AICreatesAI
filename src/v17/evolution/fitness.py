from typing import List, Dict
from ..genome import PromptGenome, CriticGenome

def calculate_prompt_fitness(prompt: PromptGenome, metrics: Dict, critic_scores: List[float]) -> float:
    """Calculates the fitness of a prompt based on objective metrics and critic scores."""
    if not metrics["passed"]:
        return 0.1

    # Weights for different components of the fitness score
    w_objective = 0.6
    w_critic = 0.4

    # Objective score (inversely proportional to execution time and complexity)
    objective_score = 1.0 / (1.0 + metrics["execution_time"] + metrics["code_complexity"])

    # Critic score (average of all critic scores)
    critic_score = sum(critic_scores) / len(critic_scores) if critic_scores else 0.0

    return (w_objective * objective_score) + (w_critic * critic_score)

def calculate_critic_fitness(critic: CriticGenome, prompt_metrics: List[Dict], critic_scores: List[float]) -> float:
    """Calculates the fitness of a critic based on its ability to correlate with objective metrics."""
    # This is a simplified correlation. A more robust implementation would use a statistical correlation.
    total_correlation = 0.0
    for i in range(len(prompt_metrics)):
        objective_score = 1.0 / (1.0 + prompt_metrics[i]["execution_time"] + prompt_metrics[i]["code_complexity"])
        total_correlation += abs(critic_scores[i] - objective_score)
    
    # Lower correlation difference means higher fitness
    return 1.0 / (1.0 + total_correlation)
