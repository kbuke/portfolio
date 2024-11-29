import "./DeleteProject.css"

export default function DeleteProject({
    projectId,
    setProjectId,
    projectName,
    projects,
    setProjects,
    setDeleteProject
}){

    console.log(`I am trying to delete project ${projectId}`)

    const handleDelete = e => {
        e.preventDefault()
        fetch(`/projects/${projectId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok){
                    setProjects(projects => projects.filter(project => project.id !== projectId))
                }
            })
            .then(setProjectId())
            .then(setDeleteProject())
    }

    return(
        <div
            id="popUp"
        >
            <form
                id="deleteProjectForm"
                onSubmit={handleDelete}
            >
                <h2>Delete {projectName}?</h2>

                <div>
                    <button
                        type="submit"
                    >
                        Submit
                    </button>

                    <button
                        onClick={() => setDeleteProject(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}