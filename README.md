# AI Creates AI (AICAI) - Recursive Code Generation

**AICAI** is a lightweight, efficiency-first CLI tool that leverages small, high-speed Large Language Models (LLMs) hosted on the Groq API to generate, improve, and recursively refine code. It is designed for developers who want to harness the power of AI for practical software engineering tasks without the overhead of large models or complex UIs.

The project's core philosophy is inspired by the recursive, self-improving architecture outlined in the **[ASI-Arch project](https://github.com/GAIR-NLP/ASI-Arch)**. It demonstrates that even models with limited context windows (≤8K tokens) can produce complex and high-quality output through an iterative process of planning, execution, and refinement.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Core Functionality](#core-functionality)
- [Groq API Integration](#groq-api-integration)
- [Architecture Flow](#architecture-flow)
- [Installation](#installation)
- [Usage Examples](#usage-examples)
- [Core Components](#core-components)
- [Design Philosophy: Lean & Powerful](#design-philosophy-lean--powerful)
- [Contributing](#contributing)
- [License & Acknowledgments](#license--acknowledgments)

---

## Project Overview

This tool is not just another code generator. It's an experiment in applied AI, built on three key principles:

1.  **Efficiency-First**: Implements only what is essential for value creation. The focus is on the core generation loop, not on extraneous features.
2.  **Recursive Improvement**: Uses a continuous feedback loop where the model's output is fed back as input for the next iteration, allowing for progressive enhancement of the code.
3.  **Small Model Optimization**: The entire workflow is designed to maximize the capabilities of small, fast models (like Llama3 8B or Gemma 7B) with limited context windows.

By taking a high-level prompt and optional code, AICAI emulates a developer's thought process: it forms a plan, breaks it down, writes the code, and then refines it.

## Core Functionality

The tool operates in a loop that mimics an advanced reasoning process, making it more powerful than a single-shot prompt.

### The Recursive Loop

1.  **Input**: The user provides a prompt (e.g., "Create a FastAPI endpoint for user authentication") and, optionally, a path to an existing code file to be improved.
2.  **Plan**: The tool sends the initial prompt to the LLM to generate a high-level plan or a list of steps required to fulfill the request.
3.  **Decompose & Execute**: For each step in the plan, the tool generates a specific, context-aware prompt. It sends this prompt along with the relevant code snippets to the LLM to write or modify the code. This decomposition is key to staying within the small context window.
4.  **Refine**: After executing the plan, the tool can run a final refinement pass. It presents the generated code back to the LLM with a prompt to "review and improve this code for clarity, efficiency, and correctness." This self-correction step is critical for quality.

This cycle can be repeated, with each pass building upon the last, to evolve a simple script into a production-ready application.

## Groq API Integration

This tool relies exclusively on the [Groq API](https://groq.com/) for its speed and efficiency.

-   **Authentication**: The tool authenticates using an API key. You must set it as an environment variable:
    ```bash
    export GROQ_API_KEY="your-groq-api-key"
    ```

-   **Model Selection**: The tool is hardcoded to use small, fast models (e.g., `llama3-8b-8192`). This is a deliberate design choice to prove the effectiveness of the recursive architecture.

-   **Working with Limited Context**: The tool is architected to handle small context windows effectively. It never sends the entire project's code. Instead, for each step, it sends only:
    - The high-level goal.
    - The specific, decomposed task.
    - The most relevant code snippet (e.g., a single function or class).

This surgical approach ensures that the context is always dense with relevant information, allowing the small model to perform as if it has a much larger understanding of the codebase.

## Architecture: The Infinite Loop of Refinement

Previous explanations were too linear. The true power of this tool, inspired by ASI-Arch, is not a simple pipeline but a **cyclical, self-correcting, and potentially infinite loop**. The goal is to create a system that doesn't just generate code, but iteratively improves it until it reaches a state of high quality and correctness. The process is designed to be interruptible by the user, but conceptually, it could run forever, constantly refining the code.

This is achieved by a more sophisticated multi-persona approach, where each persona has a detailed set of responsibilities.

```mermaid
graph TD
    A[Start: User Prompt & Code] --> B{1. The Architect};
    B -- Creates/Refines --> C(High-Level Plan);
    C --> D{2. The Coder};
    D -- Implements --> E(Code Snippet);
    E --> F{3. The Reviewer};
    F -- Generates --> G(Critique & Suggestions);
    G -- Feeds back to --> B;

    subgraph "Core Improvement Loop"
        direction LR
        B -- LLM Call --> B;
        D -- LLM Call --> D;
        F -- LLM Call --> F;
    end

    H(Final Code) -- User Interrupt --> A;
    G -- No more suggestions --> H;

    linkStyle 0 stroke-width:2px,fill:none,stroke:black;
    linkStyle 1 stroke-width:2px,fill:none,stroke:black;
    linkStyle 2 stroke-width:2px,fill:none,stroke:black;
    linkStyle 3 stroke-width:2px,fill:none,stroke:black;
    linkStyle 4 stroke-width:2px,fill:none,stroke:black,stroke-dasharray: 5 5;
    linkStyle 6 stroke-width:2px,fill:none,stroke:green;

    style B fill:#f2b04d,stroke:#333,stroke-width:2px
    style D fill:#4da6f2,stroke:#333,stroke-width:2px
    style F fill:#4df2a6,stroke:#333,stroke-width:2px
```

### The Roles in Detail:

#### 1. The Architect: The Master Planner
-   **Core Task**: Maintain the high-level vision of the project.
-   **Sub-Tasks**:
    -   **Initial Planning**: On the first loop, create a comprehensive, step-by-step plan based on the user's prompt.
    -   **Plan Refinement**: On subsequent loops, *re-evaluate the entire plan* based on the Reviewer's feedback. Does the plan need to be changed? Are there new steps to add? Should the order be modified?
    -   **Decomposition**: Break down complex steps into smaller, more manageable sub-tasks for the Coder.
-   **Prompt Focus**: "You are a 10x software architect. Your goal is to create and refine a robust, scalable, and maintainable plan. Critically analyze the current plan and the reviewer's feedback. Output a revised, numbered list of steps."

#### 2. The Coder: The Focused Implementer
-   **Core Task**: Write code for a single, specific task.
-   **Sub-Tasks**:
    -   **Contextual Understanding**: Receive the full plan for context, but focus only on the *current* step provided by the Architect.
    -   **Code Generation**: Write the most efficient, readable, and correct code to implement that single step.
    -   **Integration**: Ensure the new code snippet correctly integrates with the existing code provided in the prompt.
-   **Prompt Focus**: "You are a senior developer. Your task is to implement the following step from the plan. Here is the existing code. Write only the new code required for this step."

#### 3. The Reviewer: The Quality Gate
-   **Core Task**: Critically evaluate the code and provide actionable feedback.
-   **Sub-Tasks**:
    -   **Bug Detection**: Analyze the generated code for potential runtime errors, logical flaws, and edge cases.
    -   **Best Practices**: Check for adherence to language-specific best practices, style guides (e.g., PEP 8), and design patterns.
    -   **Suggestion Generation**: Produce a structured list of concrete, actionable suggestions. This is not just a critique; it's a set of instructions for the Architect. For example: `["ERROR: The database connection is not closed.", "SUGGESTION: Refactor the `process_data` function to be more modular."]`
-   **Prompt Focus**: "You are a meticulous code reviewer and QA engineer. Analyze the following code. Identify all bugs, style issues, and areas for improvement. Provide your feedback as a list of actionable suggestions. If there are no issues, respond with 'None'"

### The Infinite Loop in Practice:

1.  The **Architect** creates a plan.
2.  The **Coder** implements the plan, step by step.
3.  The **Reviewer** analyzes the result.
4.  **If the Reviewer provides suggestions**, the loop repeats. The **Architect** receives the suggestions and refines the plan. The **Coder** then re-implements the modified plan.
5.  **If the Reviewer responds with "None"**, the system has reached a state of equilibrium. The code is considered complete and is presented to the user.

This cyclical process of planning, coding, and reviewing allows the system to bootstrap itself from a simple prompt to a complex, high-quality application, all while using a small, efficient 8B model for each discrete step.


## Installation

Ensure you have Python 3.8+ installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/aicreatesai.git
    cd aicreatesai
    ```

2.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Set your API key:**
    ```bash
    export GROQ_API_KEY="your-groq-api-key"
    ```

## Usage Examples

### 1. Generate a New Application

Create a simple Flask web server from scratch.

```bash
python main.py --prompt "Create a simple Python web server using Flask that returns 'Hello, World!' on the root path. The server should run on port 5000." --output-file app.py
```

The tool will generate `app.py` with the complete, runnable Flask application.

### 2. Improve an Existing Function

Refactor a function in an existing file for better performance.

```bash
# Assume utils.py contains a slow function:
# def slow_data_processing(data): ...

python main.py --prompt "Refactor the 'slow_data_processing' function to be more efficient and handle potential exceptions." --file utils.py
```

The tool will modify `utils.py` in place, replacing the old function with an improved version.

### 3. Generate a Complex Algorithm

Generate a specific algorithm with requirements.

```bash
python main.py --prompt "Generate a Python function that implements the A* search algorithm. Include comments explaining the main components: the open set, the closed set, and the heuristic function." --output-file a_star.py
```

## Core Components

The codebase is intentionally simple and modular.

-   `main.py`: The CLI entry point. Uses `argparse` to handle user input and orchestrates the overall workflow.
-   `groq_client.py`: A dedicated module for all interactions with the Groq API. Handles request formatting, API calls, and error handling.
-   `recursive_improver.py`: The heart of the tool. Contains the core logic for the Plan -> Decompose -> Execute -> Refine loop.
-   `file_handler.py`: A utility for reading from and writing to files, ensuring safe and predictable file operations.
-   `prompts.py`: A centralized store for all system prompts and prompt templates. Separating prompts from logic makes them easier to tune and improve.

## Design Philosophy: Lean & Powerful

We deliberately avoid features that do not directly contribute to the core mission of recursive code improvement.

**What's Included (The Essentials):**
-   A robust CLI interface for prompts and file paths.
-   The core recursive improvement loop.
-   Clean, readable output to the console and files.
-   Direct and efficient integration with the Groq API.

**What's Not Included (By Design):**
-   A graphical user interface (GUI).
-   Project management or state-tracking features.
-   Support for multiple API providers or models outside of Groq's fast offerings.
-   Complex configuration files.

This lean approach ensures the tool remains fast, maintainable, and focused on its primary goal: making the most out of small models.

## Contributing

Contributions are welcome! This project is an exploration of AI-driven development, and new ideas are encouraged.

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/my-new-feature`.
3.  **Make your changes.**
4.  **Submit a pull request** with a clear description of your changes.

**Potential areas for extension:**
-   Improving the planning and decomposition logic.
-   Adding a "self-test" step where the tool attempts to run the generated code and fix errors.
-   Experimenting with different prompt engineering techniques.

## License & Acknowledgments

-   **License**: This project is licensed under the **MIT License**. See the `LICENSE` file for details.
-   **Acknowledgments**:
    -   This project is heavily inspired by the ideas presented in the **[ASI-Arch](https://github.com/GAIR-NLP/ASI-Arch)** paper and repository by GAIR-NLP.
    -   Powered by the incredible speed of the **[Groq API](https://groq.com/)**.
