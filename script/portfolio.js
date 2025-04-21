function addProjectsToPortfolio() {
    fetch("/projects.json")
        .then(response => response.json())
        .then(result => populatePortfolio(result))
}

function populatePortfolio(projects) {
    for (let type_index in projects) {
        if (projects[type_index].type === "video_game")
        {
            for (let project_index in projects[type_index].content) {
                let portfolioDiv = document.getElementById('portfolio-list');
                let newProjectDiv = document.createElement('div');
                newProjectDiv.appendChild(document.createTextNode(projects[type_index].content[project_index].name));

                portfolioDiv.appendChild(newProjectDiv);
            }
        }
    }
}

window.onload = addProjectsToPortfolio;