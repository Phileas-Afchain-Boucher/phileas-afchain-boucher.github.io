let globalProjectType = "video_game";

function changeProjectType(projectType) {
    globalProjectType = projectType;
    addProjectsToPortfolio();
}

function loadProject() {
    let params = new URL(document.location.toString()).searchParams;
        globalProjectType = params.get('project_type') ? params.get('project_type') : "video_game";

    addProjectsToPortfolio();
}

function addProjectsToPortfolio() {
    fetch("/projects.json")
        .then(response => response.json())
        .then(result => populatePortfolio(result))
}

function populatePortfolio(projects) {
    let portfolioDiv = document.getElementById('portfolio-list');

    // Removal of div's children
    while(portfolioDiv.firstChild){
        portfolioDiv.removeChild(portfolioDiv.firstChild);
    }

    for (let type_index in projects) {
        // Search for the type
        if (projects[type_index].type === globalProjectType)
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

window.onload = loadProject;