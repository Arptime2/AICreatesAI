document.addEventListener('DOMContentLoaded', function () {
    mermaid.initialize({ startOnLoad: true });

    const infoPanel = document.getElementById('info-panel');
    const infoContent = document.createElement('div');
    infoPanel.appendChild(infoContent);

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

    function showInfo(viewId) {
        const data = infoData[viewId];
        if (data) {
            infoContent.innerHTML = `<h3>${data.title}</h3><p>${data.text}</p>`;
        }
    }

    function setActiveView(viewId) {
        document.querySelectorAll('.mermaid-diagram-wrapper').forEach(wrapper => {
            wrapper.classList.remove('active');
        });
        document.getElementById(`${viewId}-diagram`).classList.add('active');

        document.querySelectorAll('#controls button').forEach(button => {
            button.classList.remove('active');
        });
        document.getElementById(`${viewId}-btn`).classList.add('active');

        showInfo(viewId);
    }

    document.getElementById('overview-btn').addEventListener('click', () => setActiveView('overview'));
    document.getElementById('prompt-cycle-btn').addEventListener('click', () => setActiveView('prompt-cycle'));
    document.getElementById('critic-cycle-btn').addEventListener('click', () => setActiveView('critic-cycle'));

    // Initial state
    setActiveView('overview');
});
