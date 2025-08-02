import random
from typing import List, Union
from ..genome import PromptGenome, CriticGenome

def roulette_wheel_selection(population: List[Union[PromptGenome, CriticGenome]], num_selections: int) -> List[Union[PromptGenome, CriticGenome]]:
    """Selects individuals from a population using fitness-proportionate selection."""
    total_fitness = sum(individual.fitness_score for individual in population)
    if total_fitness == 0:
        return random.choices(population, k=num_selections)

    selections = []
    for _ in range(num_selections):
        selection_point = random.uniform(0, total_fitness)
        current_fitness = 0
        for individual in population:
            current_fitness += individual.fitness_score
            if current_fitness >= selection_point:
                selections.append(individual)
                break
    return selections
