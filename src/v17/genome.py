from dataclasses import dataclass, field
from typing import List, Dict

@dataclass
class PromptGenome:
    """A structured representation of a prompt, designed for evolutionary optimization."""
    id: str
    template: str
    persona_description: str
    task_framing: str
    output_format_instruction: str
    constraints: List[str] = field(default_factory=list)
    fitness_score: float = 0.0

@dataclass
class CriticGenome:
    """A structured representation of a critic prompt, designed for co-evolution."""
    id: str
    template: str
    evaluation_criteria: List[Dict[str, str]] # e.g., [{"name": "Elegance", "description": "..."}]
    scoring_rubric: str
    fitness_score: float = 0.0
