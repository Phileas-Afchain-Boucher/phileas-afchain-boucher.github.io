function addProjectsToPortfolio() {
    fetch("/projects.json")
        .then(response => response.json())
        .then(result => populatePortfolio(result))
}

function populatePortfolio(projects) {
    let portfolioDiv = document.getElementById('portfolio-list');

    for (let type_index in projects) {
        if (projects[type_index].type === "video_game")
        {
            for (let project_index in projects[type_index].content) {
                let newProjectDiv = document.createElement('div');
                newProjectDiv.classList.add('portfolio-project');

                let imgDiv= document.createElement('img');
                imgDiv.src = projects[type_index].content[project_index].image;
                imgDiv.alt = projects[type_index].content[project_index].name + " illustration";
                newProjectDiv.appendChild(imgDiv);

                let projectInfoDiv = document.createElement('div');
                projectInfoDiv.classList.add('project-infos');
                let projectNameDiv = document.createElement('div');
                projectNameDiv.classList.add('project-name');
                let projectDescriptionDiv = document.createElement('div');
                projectDescriptionDiv.classList.add('project-description');

                projectNameDiv.appendChild(document.createTextNode(projects[type_index].content[project_index].name));
                projectDescriptionDiv.appendChild(document.createTextNode(projects[type_index].content[project_index].description));

                projectInfoDiv.appendChild(projectNameDiv);
                projectInfoDiv.appendChild(projectDescriptionDiv);

                newProjectDiv.appendChild(projectInfoDiv);

                portfolioDiv.appendChild(newProjectDiv);
            }
        }
    }
}

window.onload = addProjectsToPortfolio;