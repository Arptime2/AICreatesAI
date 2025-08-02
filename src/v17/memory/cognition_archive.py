from typing import List

class CognitionArchive:
    """A simple text-based knowledge base."""

    def __init__(self, archive_path: str):
        self.archive_path = archive_path
        self.knowledge: List[str] = self._load()

    def _load(self) -> List[str]:
        try:
            with open(self.archive_path, 'r') as f:
                return f.readlines()
        except FileNotFoundError:
            return []

    def get_knowledge(self) -> List[str]:
        return self.knowledge
