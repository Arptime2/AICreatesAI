import json
from typing import List, Dict
from ..genome import CriticGenome

class CriticDB:
    """A simple JSON-based database for storing and retrieving CriticGenomes."""

    def __init__(self, db_path: str):
        self.db_path = db_path
        self.critics: Dict[str, CriticGenome] = self._load()

    def _load(self) -> Dict[str, CriticGenome]:
        try:
            with open(self.db_path, 'r') as f:
                data = json.load(f)
                return {id: CriticGenome(**c) for id, c in data.items()}
        except FileNotFoundError:
            return {}

    def _save(self):
        with open(self.db_path, 'w') as f:
            data = {id: c.__dict__ for id, c in self.critics.items()}
            json.dump(data, f, indent=4)

    def add(self, critic: CriticGenome):
        self.critics[critic.id] = critic
        self._save()

    def get(self, critic_id: str) -> CriticGenome:
        return self.critics.get(critic_id)

    def get_all(self) -> List[CriticGenome]:
        return list(self.critics.values())
