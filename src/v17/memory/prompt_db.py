import json
from typing import List, Dict
from ..genome import PromptGenome

class PromptDB:
    """A simple JSON-based database for storing and retrieving PromptGenomes."""

    def __init__(self, db_path: str):
        self.db_path = db_path
        self.prompts: Dict[str, PromptGenome] = self._load()

    def _load(self) -> Dict[str, PromptGenome]:
        try:
            with open(self.db_path, 'r') as f:
                data = json.load(f)
                return {id: PromptGenome(**p) for id, p in data.items()}
        except FileNotFoundError:
            return {}

    def _save(self):
        with open(self.db_path, 'w') as f:
            data = {id: p.__dict__ for id, p in self.prompts.items()}
            json.dump(data, f, indent=4)

    def add(self, prompt: PromptGenome):
        self.prompts[prompt.id] = prompt
        self._save()

    def get(self, prompt_id: str) -> PromptGenome:
        return self.prompts.get(prompt_id)

    def get_all(self) -> List[PromptGenome]:
        return list(self.prompts.values())
