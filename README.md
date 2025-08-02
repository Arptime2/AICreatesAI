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

## Architecture: Autonomous Quality via Self-Generated Testing

A system that cannot validate its own work is not truly autonomous. To achieve unbounded improvement, the system must be responsible for its own quality assurance. This architecture introduces a critical new component—the `Test Developer` persona—to create a self-contained, autonomous development and verification cycle.

The system now operates on a complete, end-to-end development workflow: `Plan -> Code -> Test -> Execute`.

```mermaid
%%{init: {'theme': 'dark', 'fontFamily': 'Fira Code, monospace'}}%%
graph LR
    subgraph "STRATEGY & KNOWLEDGE"
        direction TB
        style Strategist fill:#C2185B,stroke:#FFF,stroke-width:2px
        style KB fill:#673AB7,stroke:#FFF,stroke-width:2px
        Strategist("<b>Strategist</b><br>Improves the entire process")
        KB[("Persistent<br>Knowledge Base")]
        Strategist --> KB
    end

    subgraph "AUTONOMOUS DEVELOPMENT & VERIFICATION CYCLE"
        direction LR
        style Coder fill:#0288D1
        style TestDev fill:#0097A7
        style Executor fill:#00796B
        
        UserInput["User Goal"] --> Coder
        Coder(<b>1. Coder</b><br>Writes Feature Code) -- Code --> TestDev
        TestDev(<b>2. Test Developer</b><br>Writes Unit Tests) -- Tests --> Executor
        Executor(<b>3. Executor</b><br>Runs Tests & Linters) -- "Pass / Fail<br>Stack Trace" --> Coder
    end

    %% Connections
    KB -- Primes with Wisdom --> Coder
    KB -- Primes with Wisdom --> TestDev

    Executor -- "Execution Trace & Failures" --> Strategist
    Executor --> FinalCode["Verified &<br>Tested Code"]

    style UserInput fill:#4CAF50,stroke:#FFF,stroke-width:2px
    style FinalCode fill:#4CAF50,stroke:#FFF,stroke-width:2px
```

### The Autonomous Development Cycle

This is the core engine of the system, a tight loop that mirrors a complete, modern development workflow.

1.  **The Coder Persona:** As before, this persona writes the primary application code based on the user's goal and the system's accumulated knowledge.

2.  **The Test Developer Persona (New):** This is the key to autonomy. Immediately after the `Coder` produces code, this new persona is activated. Its sole purpose is to write comprehensive unit tests for the code just created. It analyzes the feature code and the user's intent to generate meaningful tests that cover success cases, edge cases, and potential errors.

3.  **The Executor:** This component takes both the feature code and the newly generated test code and runs them in a real execution environment. It executes the test suite (`pytest`, etc.) and captures the results.

### The Self-Correction and Learning Loop

The feedback from this cycle is what drives improvement:

-   **Immediate Feedback:** If a test fails, the `Coder` receives the exact stack trace and error message. It is then tasked with fixing its own code to make the test pass. This is a tight, immediate, and powerful self-correction loop.
-   **Strategic Improvement:** The `Strategist` persona analyzes the entire cycle. It can now answer much deeper questions. Is the `Coder` writing untestable code? Is the `Test Developer` writing weak tests? The `Strategist` can then update the prompts for *both* personas, teaching them to be better developers and testers. This meta-learning is stored in the **Persistent Knowledge Base**, ensuring the system's capabilities grow over time.

This architecture creates a system that is not just a code generator, but a complete, autonomous agent responsible for the quality of its own work. It is this self-contained cycle of creation and validation that provides a robust and practical path toward infinite improvement.


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
