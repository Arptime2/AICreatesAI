import time
from src.v17.genome import PromptGenome
from src.groq_client import GroqClient

class EngineerAgent:
    """Generates code from a PromptGenome and runs tests."""

    def __init__(self):
        self.groq_client = GroqClient()

    def generate_code(self, prompt: PromptGenome) -> str:
        """Generates code from a PromptGenome."""
        prompt_text = f"{prompt.persona_description}\n{prompt.task_framing}\n{prompt.output_format_instruction}\n\n{prompt.template}"
        return self.groq_client.generate(prompt_text)

    def run_tests_and_get_metrics(self, code: str) -> dict:
        """Runs tests on the generated code and returns a dictionary of metrics."""
        metrics = {
            "passed": False,
            "execution_time": 0.0,
            "code_complexity": 0
        }

        start_time = time.time()
        try:
            # Simple complexity metric: count lines of code
            metrics["code_complexity"] = len(code.splitlines())
            exec(code)
            metrics["passed"] = True
        except Exception:
            metrics["passed"] = False
        finally:
            metrics["execution_time"] = time.time() - start_time
        
        return metrics
