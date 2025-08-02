document.addEventListener('DOMContentLoaded', function () {
    mermaid.initialize({ startOnLoad: true, theme: 'base', fontFamily: 'Inter' });

    const infoContent = document.getElementById('info-content');
    const initialText = document.querySelector('#info-panel h2');

    const infoData = {
        "DB": {
            title: "The MongoDB Research Database",
            text: "This is the heart of the system. It is a central database that serves as the collective memory and single source of truth for all agents. Agents do not communicate directly; they read from and write to the database, allowing for robust, asynchronous, and scalable operation. Each document in the database represents a single, complete experiment, tracking its entire lifecycle from hypothesis to final analysis."
        },
        "Director": {
            title: "The Director Agent",
            text: "The Director is the system's project manager. It periodically scans the database for completed experiments, identifies the most successful ones (based on their final fitness score), and initiates new research cycles. It creates new, blank 'PENDING' experiment documents in the database, assigning the Researcher to generate a new hypothesis based on the successful parent experiment."
        },
        "Researcher": {
            title: "The Researcher Agent",
            text: "The Researcher is the system's chief scientist. It picks up 'PENDING' experiments from the database, consults the external Cognition Archive for knowledge, and analyzes the parent experiment's results. It then formulates a new, specific hypothesis for improvement and designs a 'Challenger' prompt set to test it. It writes this new data to the experiment document and updates its status to 'RUNNING'."
        },
        "Engineer": {
            title: "The Engineer Agent",
            text: "The Engineer is the workhorse of the system. It picks up 'RUNNING' experiments and executes the full development cycle using the provided Challenger prompt set. This includes writing the code, writing the tests, and, crucially, entering a self-revision loop to debug its own code if the tests fail. Once the code is functionally correct, it writes the final artifacts and performance data to the experiment document."
        },
        "Critic": {
            title: "The Critic Agent (LLM-as-Judge)",
            text: "The Critic is the arbiter of quality. It finds experiments that have been successfully engineered but not yet assessed. It performs a qualitative analysis of the code, scoring it on non-functional metrics like novelty, elegance, and maintainability. This qualitative score is essential for preventing the system from settling for solutions that are merely correct but not innovative."
        },
        "Analyst": {
            title: "The Analyst Agent",
            text: "The Analyst is the final step in the loop. It finds experiments that have been fully engineered and criticized. It calculates the final, composite fitness score using a weighted formula that combines the objective performance data from the Engineer and the subjective quality scores from the Critic. It writes this final score to the database and marks the experiment as 'COMPLETED'."
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