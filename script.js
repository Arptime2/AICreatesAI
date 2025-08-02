document.addEventListener('DOMContentLoaded', function () {
    mermaid.initialize({ startOnLoad: true, theme: 'base', fontFamily: 'Inter' });

    const infoContent = document.getElementById('info-content');
    const initialText = document.querySelector('#info-panel h2');

    const infoData = {
        "MetaEngine": {
            title: "Meta-Cognitive Engine",
            text: "This is the strategic core of the entire system. It operates on a slower timescale than the task cycle and is responsible for the system's long-term improvement. It does not execute development tasks itself, but rather optimizes the agents that do."
        },
        "Analyzer": {
            title: "Performance Analyzer",
            text: "This sub-module performs a deep, root-cause analysis of the structured data in the Performance Trace DB. It identifies not just simple failures, but patterns of inefficiency, such as an agent consistently producing sub-optimal or difficult-to-test code. Its output is a detailed report that pinpoints the specific weaknesses in the current operational prompts."
        },
        "Rewriter": {
            title: "Prompt Rewriter",
            text: "This sub-module takes the detailed report from the Analyzer and executes the system's most critical function: it rewrites the operational prompts. It reasons about the identified flaws and intelligently crafts new instructions designed to prevent those specific failures in the future. This is the mechanism that drives true, reasoned improvement."
        },
        "TaskCycle": {
            title: "Autonomous Task Cycle",
            text: "This is the workhorse of the system. It operates on a fast timescale to complete the user's development tasks. It is guided by the current set of instructions in the Operational Prompts DB."
        },
        "CodeAgent": {
            title: "Code Generation Agent",
            text: "A specialized agent that receives its operational prompt (its 'instructions') from the database and writes the primary application code to fulfill a specific task."
        },
        "TestAgent": {
            title: "Test Generation Agent",
            text: "A specialized agent that receives its operational prompt and writes unit tests for the code produced by the Code Generation Agent. This ensures that the system is responsible for its own quality control."
        },
        "VerifyModule": {
            title: "Verification Module",
            text: "A non-LLM component that acts as the bridge to reality. It executes the generated tests and static analysis tools, capturing the objective, undeniable results (pass/fail, errors, logs). This grounds the system's learning in real-world feedback."
        },
        "PromptDB": {
            title: "Operational Prompts DB",
            text: "This database stores the current set of operational prompts that guide the agents in the Task Cycle. It is a living document, continuously refined and rewritten by the Meta-Cognitive Engine."
        },
        "LogDB": {
            title: "Performance Trace DB",
            text: "This database stores the structured, detailed logs from the Verification Module. It is the primary source of truth for the Performance Analyzer, providing the raw data needed for root-cause analysis."
        }
    };

    window.callback = (id) => {
        const data = infoData[id];
        if (data) {
            initialText.style.display = 'none';
            infoContent.innerHTML = `<h3>${data.title}</h3><p>${data.text}</p>`;
        }
    };
});