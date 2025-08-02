document.addEventListener('DOMContentLoaded', function () {
    const diagramContainer = document.getElementById('diagram-container');
    const infoContent = document.getElementById('info-content');
    const initialText = document.querySelector('#info-panel h2');

    // Static SVG definition for robustness
    const svgContent = `
    <svg width="100%" height="100%" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
        <!-- Definitions -->
        <defs>
            <style>
                .node-text { font-family: 'Inter', sans-serif; font-size: 18px; }
                .label-text { font-family: 'Inter', sans-serif; font-size: 14px; fill: #555; }
            </style>
        </defs>

        <!-- Macro-Cycle -->
        <g id="Director" class="svg-node">
            <rect x="400" y="50" width="400" height="80" rx="10" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" />
            <text x="600" y="95" text-anchor="middle" class="node-text"><b>Director Agent</b> (Macro-Cycle)</text>
        </g>

        <!-- Meso-Cycle -->
        <g id="Researcher" class="svg-node">
            <rect x="100" y="200" width="400" height="80" rx="10" fill="#E3F2FD" stroke="#2196F3" stroke-width="2" />
            <text x="300" y="245" text-anchor="middle" class="node-text"><b>Researcher & Designer</b> (Meso-Cycle)</text>
        </g>

        <!-- Micro-Cycle -->
        <g id="Engineer" class="svg-node">
            <rect x="700" y="200" width="400" height="80" rx="10" fill="#E0F2F1" stroke="#009688" stroke-width="2" />
            <text x="900" y="245" text-anchor="middle" class="node-text"><b>Engineer Agent</b> (Micro-Cycle)</text>
        </g>

        <!-- Critic & Analyst -->
        <g id="Critic" class="svg-node">
            <rect x="100" y="350" width="400" height="80" rx="10" fill="#FFF9C4" stroke="#FFEB3B" stroke-width="2" />
            <text x="300" y="395" text-anchor="middle" class="node-text"><b>Critic & Analyst Agents</b></text>
        </g>

        <!-- Databases -->
        <g id="DB" class="svg-node">
            <rect x="400" y="500" width="400" height="120" rx="10" fill="#FFE0B2" stroke="#FF9800" stroke-width="3" />
            <text x="600" y="550" text-anchor="middle" class="node-text"><b>Central Database</b></text>
            <text x="600" y="580" text-anchor="middle" class="label-text">(Experiments, Prompts, Logs)</text>
        </g>

        <!-- Arrows -->
        <path d="M600,130 L600,180 L300,180 L300,200" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <text x="450" y="170" class="label-text">1. Research Mandate</text>
        <path d="M300,280 L300,330 L900,330 L900,280" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <text x="600" y="320" class="label-text">2. Challenger Prompt</text>
        <path d="M900,280 L900,480 L600,480 L600,500" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <text x="750" y="400" class="label-text">3. Performance Data</text>
        <path d="M600,500 L600,480 L300,480 L300,430" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <text x="450" y="470" class="label-text">4. Data for Assessment</text>
        <path d="M300,350 L300,110 L400,110" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <text x="350" y="140" class="label-text">5. Final Analysis</text>

        <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#333" />
            </marker>
        </defs>
    </svg>
    `;

    diagramContainer.innerHTML = svgContent;

    const infoData = {
        "Director": {
            title: "The Director Agent (Macro-Cycle)",
            text: "The highest level of strategic thinking. The Director analyzes long-term trends from the database and consults the Cognition Archive to issue broad Research Mandates. It does not design or run experiments, but sets the overall research agenda for the entire system."
        },
        "Researcher": {
            title: "The Researcher & Designer Agents (Meso-Cycle)",
            text: "This is the scientific core of the system. The Researcher receives a Research Mandate and formulates a specific, testable hypothesis. The Designer then creates a concrete 'Challenger' prompt set to test that hypothesis against the current 'Champion'."
        },
        "Engineer": {
            title: "The Engineer Agent (Micro-Cycle)",
            text: "The hands-on developer. The Engineer executes the fast, inner loop of coding, testing, and, crucially, self-revising. It takes a prompt set and works until it produces a functionally correct, tested code artifact."
        },
        "Critic": {
            title: "The Critic & Analyst Agents",
            text: "The arbiters of quality and performance. The Critic provides a qualitative score for elegance and novelty, while the Analyst calculates the final, composite fitness score. This ensures the system evolves towards solutions that are not just correct, but genuinely superior."
        },
        "DB": {
            title: "The Central Database",
            text: "The single source of truth. All agents communicate asynchronously through this database. It stores the complete history of all experiments, prompts, performance logs, and qualitative assessments, providing the collective memory that enables long-term, structured learning."
        }
    };

    document.querySelectorAll('.svg-node').forEach(node => {
        node.addEventListener('click', () => {
            const data = infoData[node.id];
            if (data) {
                initialText.style.display = 'none';
                infoContent.innerHTML = `<h3>${data.title}</h3><p>${data.text}</p>`;
            }
        });
    });
});
