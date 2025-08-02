document.addEventListener('DOMContentLoaded', function () {
    mermaid.initialize({ startOnLoad: true, theme: 'base', fontFamily: 'Inter' });

    const infoContent = document.getElementById('info-content');
    const initialText = document.querySelector('#info-panel h2');

    const infoData = {
        "Analyst": {
            title: "The Analyst Agent",
            text: "The Analyst is the system's chief scientist. It does not write code or prompts directly. Instead, it pores over the empirical data in the Performance Log Database to identify statistically significant patterns of failure or inefficiency. Its sole output is a specific, testable hypothesis for improvement (e.g., \"Hypothesis: The current prompt's lack of explicit error handling instructions is correlated with a 15% failure rate in integration tests.\"). This grounds the entire improvement process in scientific rigor."
        },
        "Designer": {
            title: "The Designer Agent",
            text: "The Designer is the system's experimental designer. It receives the concrete, testable hypothesis from the Analyst and translates it into a new 'Challenger' prompt. It does this by applying the proposed change to the current 'Champion' prompt. This separation of concerns ensures that the hypothesis is tested in a controlled and precise manner."
        },
        "Engineer": {
            title: "The Engineer Agent",
            text: "The Engineer is the workhorse of the system. It takes a prompt set (either the Champion or a Challenger) and executes the full development cycle: it interprets the prompt to write code, writes corresponding unit tests, and runs them. Its primary goal is to produce a working, tested code artifact."
        },
        "Debugger": {
            title: "The Self-Revision Mechanism",
            text: "This is the most critical feature of the Engineer Agent and is directly inspired by ASI-Arch. If a test fails, the Engineer is re-invoked in a special 'debug mode'. It is given the code, the failing test, and the full error trace. Its new, tightly-scoped task is to analyze the error and produce a patch to fix the bug. This allows the system to overcome simple implementation errors without discarding a potentially valuable underlying idea."
        },
        "PromptDB": {
            title: "The Prompt Database",
            text: "This database stores the full, structured prompts for all agents. It always contains the current 'Champion' prompt set (the best-performing one) and, during an experiment, one or more 'Challenger' sets. This allows for the rigorous A/B testing that drives the system's evolution."
        },
        "LogDB": {
            title: "The Performance Log Database",
            text: "This database is the system's source of ground truth. It stores the detailed, empirical results of every test run, including pass/fail rates, code complexity metrics, efficiency data (e.g., token usage), and error traces. This rich, structured data is the essential fuel for the Analyst Agent's scientific discovery process."
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