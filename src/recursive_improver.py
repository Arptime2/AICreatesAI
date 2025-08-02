"""
The heart of the tool. Contains the core logic for the
Plan -> Decompose -> Execute -> Refine loop.
"""

from .groq_client import GroqClient
from . import prompts


class RecursiveImprover:
    """Implements the recursive improvement loop."""

    def __init__(self):
        self.groq_client = GroqClient()

    def run(self, user_prompt: str, file_content: str = "") -> str:
        """Runs the full recursive improvement process."""
        # 1. Plan
        plan_prompt = prompts.PLANNING_PROMPT.format(user_prompt=user_prompt)
        plan = self.groq_client.generate(plan_prompt)
        print(f"Generated Plan:\n{plan}")

        # 2. Decompose & Execute
        steps = [step.strip() for step in plan.split('\n') if step.strip()]
        current_code = file_content
        for step in steps:
            if not step:
                continue
            print(f"Executing Step: {step}")
            execution_prompt = prompts.EXECUTION_PROMPT.format(
                user_prompt=user_prompt,
                plan=plan,
                step=step,
                current_code=current_code,
            )
            generated_code = self.groq_client.generate(execution_prompt)
            current_code += "\n" + generated_code

        # 3. Refine
        print("Refining generated code...")
        refinement_prompt = prompts.REFINEMENT_PROMPT.format(code=current_code)
        refined_code = self.groq_client.generate(refinement_prompt)

        return refined_code
