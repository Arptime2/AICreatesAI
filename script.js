document.addEventListener('DOMContentLoaded', function () {
    const diagramContainer = document.getElementById('diagram-container');
    const infoContent = document.getElementById('info-content');
    const initialText = document.querySelector('#info-panel h2');

    const diagrams = {
        "overview": `
        graph TD
            subgraph "COMPETITIVE CO-EVOLUTIONARY SYSTEM"
                A[Prompt Population]
                B[Critic Population]
                C(Engineer Agent)
                D[Cognition Archive]
                A <--> C
                B <--> C
                D --> A
                D --> B
            end
        `,
        "prompt-cycle": `
        graph TD
            A[Prompt Population] --> B{Select Fittest Prompts}
            B --> C{Crossover & Mutation}
            C --> D[New Generation of Prompts]
            D --> A
        `,
        "critic-cycle": `
        graph TD
            A[Critic Population] --> B{Select Fittest Critics}
            B --> C{Crossover & Mutation}
            C --> D[New Generation of Critics]
            D --> A
        `
    };

    const infoData = {
        "overview": {
            title: "System Overview",
            text: "The V17 architecture is a competitive co-evolutionary system. Two populations, a population of Prompts (the Artists) and a population of Critics (the Judges), evolve in parallel. The Engineer Agent acts as the bridge, generating solutions from the Prompts and feeding the results to the Critics. The Cognition Archive provides the external knowledge to seed both populations with intelligent starting points."
        },
        "prompt-cycle": {
            title: "Prompt Evolution Cycle",
            text: "The population of Prompts is constantly evolving. In each cycle, the fittest Prompts (those that generate the highest-scoring solutions) are selected. They are then used to create a new generation through crossover (combining the traits of two successful Prompts) and mutation (introducing small, random changes to explore new possibilities)."
        },
        "critic-cycle": {
            title: "Critic Evolution Cycle",
            text: "The population of Critics is also constantly evolving. In each cycle, the fittest Critics (those that are best at identifying high-quality solutions) are selected. They are then used to create a new generation, leading to a more sophisticated and nuanced understanding of what constitutes a 'good' solution."
        }
    };

    function renderDiagram(diagramId) {
        mermaid.mermaidAPI.render('mermaid-diagram', diagrams[diagramId], (svgCode) => {
            diagramContainer.innerHTML = svgCode;
        });
        const data = infoData[diagramId];
        if (data) {
            initialText.style.display = 'none';
            infoContent.innerHTML = `<h3>${data.title}</h3><p>${data.text}</p>`;
        }
    }

    document.getElementById('overview-btn').addEventListener('click', () => {
        renderDiagram('overview');
        setActiveButton('overview-btn');
    });

    document.getElementById('prompt-cycle-btn').addEventListener('click', () => {
        renderDiagram('prompt-cycle');
        setActiveButton('prompt-cycle-btn');
    });

    document.getElementById('critic-cycle-btn').addEventListener('click', () => {
        renderDiagram('critic-cycle');
        setActiveButton('critic-cycle-btn');
    });

    function setActiveButton(buttonId) {
        document.querySelectorAll('#controls button').forEach(button => {
            button.classList.remove('active');
        });
        document.getElementById(buttonId).classList.add('active');
    }

    // Initial render
    renderDiagram('overview');
});