document.addEventListener('DOMContentLoaded', function () {
    mermaid.initialize({ startOnLoad: true });

    const infoContent = document.getElementById('info-content');

    const infoData = {
        "Meta-Prompt": {
            title: "Meta-Prompt: The Self-Writing AI Architect",
            text: "This is the core of the V10 architecture. It is a high-level reasoning agent that analyzes the system's overall performance. Its primary function is to perform root-cause analysis on failures and inefficiencies and then rewrite the operational prompts for the other agents. This is not a random mutation; it is an intelligent, reasoned recalibration of the system's own internal logic, enabling rapid and targeted improvements."
        },
        "CodeGenerationAgent": {
            title: "Code Generation Agent",
            text: "A specialized agent that uses its current operational prompt to write application code. Its behavior and quality are entirely dependent on the instructions written by the Meta-Prompt."
        },
        "TestGenerationAgent": {
            title: "Test Generation Agent",
            text: "A specialized agent that uses its current operational prompt to write unit tests for the code produced by the Code Generation Agent. By generating its own tests, the system takes full responsibility for its own quality assurance."
        },
        "VerificationModule": {
            title: "Verification Module",
            text: "A non-LLM component that executes the generated tests and static analysis tools. It captures objective, real-world performance data (e.g., pass/fail rates, stack traces, linting errors) which is crucial for the Meta-Prompt's analysis."
        },
        "OperationalPrompts": {
            title: "Operational Prompts Database",
            text: "A structured database that stores the current set of operational prompts for all specialized agents. This database is dynamically updated and rewritten by the Meta-Prompt at the end of each Cognitive Recalibration Cycle."
        },
        "PerformanceLogs": {
            title: "Performance & Trace Logs",
            text: "A structured log that captures all relevant data from a task execution cycle. This includes the objective results from the Verification Module and a trace of the agents' actions. This log serves as the primary input for the Meta-Prompt's analysis."
        }
    };

    window.callback = (id) => {
        const data = infoData[id];
        if (data) {
            infoContent.innerHTML = `<h3>${data.title}</h3><p>${data.text}</p>`;
        }
    };
});
