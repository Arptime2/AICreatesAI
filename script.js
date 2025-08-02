document.addEventListener('DOMContentLoaded', function () {
    mermaid.initialize({ startOnLoad: true, theme: 'base', fontFamily: 'Inter' });

    const infoContent = document.getElementById('info-content');
    const initialText = document.querySelector('#info-panel h2');

    const infoData = {
        "MetaEngine": {
            title: "Meta-Cognitive Engine (The Fixer)",
            text: "This engine is the reactive part of the system. It is triggered *only when a task fails*. It performs a root-cause analysis of the failure and rewrites the current 'Champion' set of prompts to fix the identified flaw. Its goal is to ensure robustness and correctness."
        },
        "Innovator": {
            title: "Innovator Agent (The Dreamer)",
            text: "This agent is the proactive, creative heart of the system. It is triggered *only when a task succeeds*. Its sole purpose is to challenge the status quo. It takes the successful 'Champion' prompt set and is explicitly tasked with creating a fundamentally different 'Challenger' set. It is rewarded for creativity and for proposing novel approaches that could lead to a more elegant or efficient solution."
        },
        "ABTest": {
            title: "Competitive A/B Testing Framework",
            text: "This is the engine of evolution. When a new 'Challenger' prompt set is created by the Innovator, this framework runs the same task with both the 'Champion' and 'Challenger' sets. It then compares the results using a sophisticated fitness function (measuring correctness, efficiency, elegance, etc.). If the Challenger's performance is demonstrably superior, it is promoted to become the new Champion."
        },
        "TaskCycle": {
            title: "Autonomous Task Cycle",
            text: "The workhorse of the system. It executes a given development task using a specific set of prompts (either the Champion or a Challenger) provided by the Prompt Database. It is responsible for the entire Plan -> Code -> Test -> Execute workflow."
        },
        "PromptDB": {
            title: "Prompt Database",
            text: "This database stores the complete sets of operational prompts. It always contains the current 'Champion' set. When the Innovator is active, it also contains one or more 'Challenger' sets that are candidates for promotion."
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
