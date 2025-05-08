let globalProjectCategory = "video_game";
let currentProjectCategory = "video_game";

function changeProjectType(projectCategory) {
    currentProjectCategory = projectCategory;
    addProjectsToPortfolio();
}

function loadProject() {
    let params = new URL(document.location.toString()).searchParams;
    globalProjectCategory = params.get('project-category') ? params.get('project-category') : "video_game";
    currentProjectCategory = globalProjectCategory;

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

    let projects_indexes = projects.categories[currentProjectCategory];

    for (let i in projects_indexes) {
        let project_index = projects_indexes[i];

        let newProjectDiv = document.createElement('div');
        newProjectDiv.classList.add('portfolio-project');

        if (projects.projects[project_index].image) {
            let imgDiv = document.createElement('img');
            imgDiv.src = projects.projects[project_index].image;
            imgDiv.alt = projects.projects[project_index].name + " illustration";
            newProjectDiv.appendChild(imgDiv);
        }

        let projectInfoDiv = document.createElement('div');
        projectInfoDiv.classList.add('project-infos');
        let projectNameDiv = document.createElement('div');
        projectNameDiv.classList.add('project-name');
        let projectDescriptionDiv = document.createElement('div');
        projectDescriptionDiv.classList.add('project-description');

        projectNameDiv.appendChild(document.createTextNode(projects.projects[project_index].name));
        projectDescriptionDiv.appendChild(document.createTextNode(projects.projects[project_index].description));

        projectInfoDiv.appendChild(projectNameDiv);
        projectInfoDiv.appendChild(projectDescriptionDiv);

        if (projects.projects[project_index].link) {
            let projectLink = document.createElement('a');
            projectLink.href = projects.projects[project_index].link;
            projectLink.target = '_blank';
            projectLink.appendChild(document.createTextNode("Lien vers le projet 🡥"));
            projectInfoDiv.appendChild(projectLink);
        }

        newProjectDiv.appendChild(projectInfoDiv);

        portfolioDiv.appendChild(newProjectDiv);
    }
/*
    for (let type_index in projects) {
        // Search for the type
        if (projects[type_index].type === currentProjectCategory)
        {
            for (let project_index in projects[type_index].content) {
                let newProjectDiv = document.createElement('div');
                newProjectDiv.classList.add('portfolio-project');

                if (projects[type_index].content[project_index].image) {
                    let imgDiv = document.createElement('img');
                    imgDiv.src = projects[type_index].content[project_index].image;
                    imgDiv.alt = projects[type_index].content[project_index].name + " illustration";
                    newProjectDiv.appendChild(imgDiv);
                }

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

                if (projects[type_index].content[project_index].link) {
                    let projectLink = document.createElement('a');
                    projectLink.href = projects[type_index].content[project_index].link;
                    projectLink.target = '_blank';
                    projectLink.appendChild(document.createTextNode("Lien vers le projet 🡥"));
                    projectInfoDiv.appendChild(projectLink);
                }

                newProjectDiv.appendChild(projectInfoDiv);

                portfolioDiv.appendChild(newProjectDiv);
            }
        }
    }*/
}

window.onload = loadProject;