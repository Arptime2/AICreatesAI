import json
from typing import List
from .genome import PromptGenome, CriticGenome

class Logger:
    """A simple logger to track the state of the populations at each generation."""

    def __init__(self, log_path: str):
        self.log_path = log_path

    def log_generation(self, generation: int, prompts: List[PromptGenome], critics: List[CriticGenome]):
        """Logs the state of the populations at a given generation."""
        with open(self.log_path, 'a') as f:
            f.write(f"--- Generation {generation} ---\n")
            f.write("Prompts:\n")
            for p in prompts:
                f.write(json.dumps(p.__dict__, indent=4))
                f.write("\n")
            f.write("Critics:\n")
            for c in critics:
                f.write(json.dumps(c.__dict__, indent=4))
                f.write("\n")

