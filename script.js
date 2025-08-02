document.addEventListener('DOMContentLoaded', function () {
    mermaid.initialize({ startOnLoad: true, theme: 'base', fontFamily: 'Inter' });

    const infoContent = document.getElementById('info-content');
    const initialText = document.querySelector('#info-panel h2');

    const infoData = {
        "CognitionArchive": {
            title: "The Cognition Archive",
            text: "This is the system's library and its connection to the vast body of human knowledge. It is a curated vector database containing seminal research papers, articles, and documentation on software design patterns, algorithms, and architectural best practices. It provides the external, grounding knowledge required for genuine, non-hallucinatory innovation."
        },
        "Researcher": {
            title: "The Researcher Agent",
            text: "The Researcher is the system's chief scientist. It consults the Cognition Archive and the system's own past experimental results to formulate high-level, creative Research Directions. It does not just propose small tweaks; it proposes new strategic approaches inspired by established computer science principles. Its goal is to generate a plausible hypothesis for a superior 'Challenger' prompt set."
        },
        "Engineer": {
            title: "The Engineer Agent",
            text: "The Engineer is the robust workhorse of the system. It takes a prompt set (either the Champion or a Challenger) and executes the full development cycle: it writes code, writes corresponding unit tests, and runs them. It includes a critical self-revision mechanism that allows it to debug its own code when a test fails, ensuring that good ideas are not discarded due to simple implementation errors."
        },
        "Critic": {
            title: "The Critic Agent (LLM-as-Judge)",
            text: "The Critic is the key to escaping local optima and rewarding true quality. After a solution has been proven functionally correct by the Engineer, the Critic performs a qualitative assessment. It is prompted with architectural principles from the Cognition Archive and scores the solution on non-functional, qualitative metrics like elegance, maintainability, simplicity, and novelty. A correct but clumsy solution will be scored poorly, preventing the system from settling for mediocrity."
        },
        "PromptDB": {
            title: "The Prompt Database",
            text: "This database stores the full, structured prompts for all agents. It always contains the current 'Champion' prompt set (the best-performing one) and, during an experiment, one or more 'Challenger' sets. The final promotion to Champion is decided by a fitness function that weighs both the Engineer's objective performance data and the Critic's qualitative score."
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
