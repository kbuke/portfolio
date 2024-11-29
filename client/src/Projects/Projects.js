import "./Projects.css"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import gitLogo from "../assets/gitHub.png"

import NewProject from "./Components/NewProject"

import NewProjectStack from "./Components/NewProjectStack"

import DeleteProject from "./Components/DeleteProject"

import NewPoint from "./Components/NewPoint"

import EditProject from "./Components/EditProject"

import DeletePoint from "./Components/DeletePoint"

import EditPoints from "../TechStack/Components/EditPoints"

import React from "react"

export default function Projects({
    projects,
    setProjects,
    addButton,
    loggedUser,
    allInstitutes,
    setAllInstitutes,
    techStack,
    projectStack,
    setProjectStack,
    projectPoints,
    setProjectPoints,
    editIcon,
    binIcon
}){


    const [sortProjects, setSortProjects] = useState([])
    const [newProject, setNewProject] = useState(false)

    const [newStack, setNewStack] = useState(false)

    const [projectId, setProjectId] = useState()

    const [newPoint, setNewPoint] = useState(false)

    const [deleteProject, setDeleteProject] = useState(false)

    const [editProject, setEditProject] = useState(false)

    const [projectImg, setProjectImg] = useState("")
    const [projectName, setProjectName] = useState("")
    const [projectGit, setProjectGit] = useState("")
    const [projectBlog, setProjectBlog] = useState("")
    const [projectStart, setProjectStart] = useState("")
    const [projectEnd, setProjectEnd] = useState("")

    const [deletePoint, setDeletePoint] = useState(false)

    const [editPoint, setEditPoint] = useState(false)

    const [pointId, setPointId] = useState()
    const [point, setPoint] = useState("")

    console.log(`I am trying to delete a point ${pointId}: ${deletePoint}`)

    const handleProjectStack = (identity) => {
        setProjectId(identity)
        setNewStack(true)
    }

    const handleProjectPoint = (identity) => {
        setNewPoint(true)
        setProjectId(identity)
    }

    //Handle edit request
    const handleEditProject = (projectId, projectImg, projectName, projectGit, projectBlog, projectStart, projectEnd) => {
        setProjectId(projectId)
        setProjectImg(projectImg)
        setProjectName(projectName)
        setProjectGit(projectGit? projectGit : "")
        setProjectBlog(projectBlog? projectBlog : "")
        setProjectStart(projectStart)
        setProjectEnd(projectEnd)
        setEditProject(true)
    }

    //Handle delete request
    const handleDeleteProject = (projectId, projectName) => {
        setProjectId(projectId)
        setDeleteProject(true)
        setProjectName(projectName)
    }

    const handleDeletePoint = (pointId) => {
        setPointId(pointId)
        setDeletePoint(true)
    }

    const handLEditPoint = (pointId, point) => {
        setPointId(pointId)
        setPoint(point)
        setEditPoint(true)
    }

    //Use dependancy array to alter projects when changes made
    useEffect(() => {
        setSortProjects(projects.sort((a, b) => new Date(b.start_date) - new Date(a.start_date)))
    }, [projects, projectStack, projectPoints])


    const renderProjects = sortProjects.map((project) => {
        const projectName = project.name;
        const projectImg = project.image;
    
        const projectInstitution = project.institutes || {};
        const instituteLogo = projectInstitution.logo
            ? projectInstitution.logo
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQldmNv4T8GigQz22fsqi3xYDEMx5wHNMX-1g&s";
        const instituteName = projectInstitution.name;
    
        const gitLink = project.git_hub_link ? project.git_hub_link : null;
        const blogLink = project.blog_link ? project.blog_link : null;
    
        const projectStacks = project.project_language;
        const specificProjectStack = [...new Set(projectStacks.map((proj) => proj.languages.name))];
    
        const projectPoints = project.points;
        const renderPoints = projectPoints.map((points) => (
            <React.Fragment key={points.id}>
                <li className="pointsList" style={{ marginBottom: "20px" }}>
                    {points.point}
                </li>
                {loggedUser ? (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "20% 5%",
                            gap: "20px",
                            marginBottom: "10px",
                        }}
                    >
                        <button
                            className="pointOptionButton"
                            onClick={() => handLEditPoint(points.id, points.point)}
                        >
                            Edit Point
                        </button>
                        <button
                            className="pointOptionButton"
                            onClick={() => handleDeletePoint(points.id)}
                        >
                            Delete Point
                        </button>
                    </div>
                ) : null}
            </React.Fragment>
        ));
        
    
        return (
            <div key={project.id} style={{ display: "flex", flexDirection: "column" }}>
                <div className="projectContainer">
                    <img
                        alt={`${projectName}Image`}
                        src={projectImg}
                        className="projectImg"
                    />
                    <div 
                        className="overlay"
                    >
                        <img 
                            alt={`${instituteName} logo`}
                            src={instituteLogo}
                            className="instituteLogo"
                        />
    
                        <ul>{renderPoints}</ul>

                        {loggedUser ?
                            <div
                                style={{display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: "20px", marginBottom: "30px"}}
                            >
                                <div
                                    className="newPointContainer"
                                >
                                    <img 
                                        src={addButton}
                                        className="addButton"
                                        onClick={() => handleProjectPoint(project.id)}
                                        alt="addPoint"
                                    />
                                </div>

                                <div
                                    className="editProjectButtonContainer"
                                    onClick={() => handleEditProject(
                                        project.id, 
                                        project.image, 
                                        project.name, 
                                        project.git_hub_link, 
                                        project.blog_link,
                                        project.start_date,
                                        project.end_date
                                    )}
                                >
                                    <img 
                                        className="editProjectButton"
                                        src={editIcon}
                                        alt="editProject"
                                    />
                                </div>

                                <div
                                    className="deleteProjectButtonContainer"
                                >
                                    <img 
                                        className="deleteProjectButton"
                                        src={binIcon}
                                        alt="deleteProject"
                                        onClick={() => handleDeleteProject(project.id, project.name)}
                                    />
                                </div>
                            </div>
                            :
                            null
                        }

                        <div id="projectLinkGrid">
                            {gitLink ?
                                <Link to={gitLink} className="linkContainer">
                                    <img 
                                        alt={"Git Hub link"}
                                        src={gitLogo}
                                        className="linkImg"
                                    />
                                </Link>
                                :
                                null
                            }
    
                            {blogLink ?
                                <Link
                                    to={blogLink}
                                    className="linkContainer"
                                    style={{ alignSelf: "end" }}
                                >
                                    <img 
                                        alt={"BlogLink"}
                                        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiix8XOZ_wZxRWWcSuaKdxR9Ya7Q7EiBm33Q&s"}
                                        className="linkImg"
                                    />
                                </Link>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
                <h3 className="projectTitle">{projectName}</h3>
    
                <div className="projectStacks">
                    <h3 style={{ marginTop: "0px", fontWeight: 300 }}>
                        {specificProjectStack.join(" | ")}
                    </h3>
                </div>


                {loggedUser ?
                    <div
                        id="newProjectStackButton"
                        onClick={() => handleProjectStack(project.id)}
                    >
                        <img 
                            src={addButton}
                            alt="add new project stack"
                            className="addButton"
                        />
                    </div>
                    :
                    null
                }
            </div>
        );
    });

    return(
        <>
            <h1
                id="subHeadings"
            >
                Projects
            </h1>

            <div
                id="projectRenderGrid"
            >
                {newProject ? 
                    <NewProject 
                        setNewProject={setNewProject}
                        projects={projects}
                        setProjects={setProjects}
                        allInstitutes={allInstitutes}
                        setAllInstitutes={setAllInstitutes}
                    />
                    :
                    null
                }

                {newStack ?
                    <NewProjectStack 
                        techStack={techStack}
                        projectId={projectId}
                        setNewStack={setNewStack}
                        projectStack={projectStack}
                        setProjectStack={setProjectStack}
                    />
                    :
                    null
                }

                {newPoint ?
                    <NewPoint 
                        projectId={projectId}
                        projectPoints={projectPoints}
                        setProjectPoints={setProjectPoints}
                        setNewPoint={setNewPoint}
                    />
                    :
                    null
                }

                {deleteProject ?
                    <DeleteProject 
                        projectId={projectId}
                        setProjectId={setProjectId}
                        projectName={projectName}
                        projects={projects}
                        setProjects={setProjects}
                        setDeleteProject={setDeleteProject}
                    />
                    :
                    null
                }

                {editProject ?
                    <EditProject 
                        projectImg={projectImg}
                        setProjectImg={setProjectImg}
                        projectName={projectName}
                        setProjectName={setProjectName}
                        projectGit={projectGit}
                        setProjectGit={setProjectGit}
                        projectBlog={projectBlog}
                        setProjectBlog={setProjectBlog}
                        projectStart={projectStart}
                        setProjectStart={setProjectStart}
                        projectEnd={projectEnd}
                        setProjectEnd={setProjectEnd}
                        setEditProject={setEditProject}
                        projectId={projectId}
                        projects={projects}
                        setProjects={setProjects}
                    />
                    :
                    null
                }

                {deletePoint ?
                    <DeletePoint 
                        pointId={pointId}
                        setPointId={setPointId}
                        setDeletePoint={setDeletePoint}
                        projectPoints={projectPoints}
                        setProjectPoints={setProjectPoints}
                    />
                    :
                    null
                }

                {editPoint ?
                    <EditPoints 
                        pointId={pointId}
                        setPointId={setPointId}
                        point={point}
                        setPoint={setPoint}
                        setEditPoint={setEditPoint}
                        projectPoints={projectPoints}
                        setProjectPoints={setProjectPoints}
                    />
                    :
                    null
                }

                {renderProjects}

                {loggedUser ?
                    <div
                        className="techLogoContainer"
                    >
                        <img
                            src={addButton}
                            className="addButton"
                            onClick={() => setNewProject(true)}
                            alt="addProject"
                        />
                    </div>
                    :
                    null
                }
            </div>
        </>
    )
}