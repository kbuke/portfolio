import { useEffect, useState } from "react"

import "./TechStack.css"

import NewStack from "./Components/NewStack"
import DeleteStack from "./Components/DeleteStack"
import EditStack from "./Components/EditStack"

export default function TechStack({
    techStack,
    setTechStack,
    loggedUser,
    addButton,
    binIcon,
    editIcon
}){
    const [specificTechStack, setSpecificTechStack] = useState([])
    const [addStack, setAddStack] = useState(false)

    const [deleteStack, setDeleteStack] = useState(false)
    const [selectStackName, setSelectStackName] = useState("")
    const [selectedStackId, setSelectedStackId] = useState()

    const [editStack, setEditStack] = useState(false)
    const [editStackImg, setEditStackImg] = useState("")
    const [editStackExperience, setEditStackExperience] = useState("")

    const handleDelete = (stackName, stackId) => {
        setDeleteStack(true)
        setSelectStackName(stackName)
        setSelectedStackId(stackId)
    }

    const handleEdit = (stackId, stackName, stackImg, stackExp) => {
        setSelectedStackId(stackId)
        setEditStack(true)
        setSelectStackName(stackName)
        setEditStackImg(stackImg)
        setEditStackExperience(stackExp)
    }

    useEffect(() => (
        setSpecificTechStack(techStack)
    ), [techStack])

    //Render tech stack
    const renderStack = specificTechStack.map((tech, index) => (
        <div
            key={index}
            className="techContainer"
        >
            <div
                className="techGrid"
            >
                <div
                    className="techLogoContainer"
                >
                    <img 
                        className="techLogo"
                        src={tech.logo}
                        alt={`${tech.name} Logo`}
                    />
                </div>
                
                <div>
                    <h1
                        className="techName"
                    >
                        {tech.name}
                    </h1>

                    <h3
                        style={{
                            fontWeight: "300",
                            fontSize: "150%",
                            marginTop: "10px"
                        }}
                    >
                        {tech.experience}
                    </h3>

                    {loggedUser ?
                        <div
                            style={{display: "grid", gridTemplateColumns: "repeat(10% 10%)", marginBottom: "5px"}}
                        >
                            <img 
                                src={binIcon}
                                alt="deleteStack"
                                onClick={() => handleDelete(tech.name, tech.id)}
                                className="editDeleteStack"
                            />

                            <img 
                                src={editIcon}
                                alt="editStack"
                                className="editDeleteStack"
                                onClick={() => handleEdit(tech.id, tech.name, tech.logo, tech.experience)}
                            />
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    ))
    return(
        <>
            {deleteStack ?
                <DeleteStack 
                    setDeleteStack={setDeleteStack}
                    selectStackName={selectStackName}
                    selectedStackId={selectedStackId}
                    setSelectedStackId={setSelectedStackId}
                    techStack={techStack}
                    setTechStack={setTechStack}
                />
                :
                null
            }

            {editStack? 
                <EditStack 
                    selectedStackId={selectedStackId}
                    selectStackName={selectStackName}
                    setSelectStackName={setSelectStackName}
                    setEditStack={setEditStack}
                    editStackImg={editStackImg}
                    setEditStackImg={setEditStackImg}
                    editStackExperience={editStackExperience}
                    setEditStackExperience={setEditStackExperience}
                    techStack={techStack}
                    setTechStack={setTechStack}
                />
                :
                null
            }

            <h1
                id="subHeadings"
            >
                Tech Stack
            </h1>
            <div
                id="techStackGrid"
            >
                {addStack ?
                    <NewStack 
                        setAddStack={setAddStack}
                        techStack={techStack}
                        setTechStack={setTechStack}
                    />
                    :
                    null
                }

                {renderStack}

                {loggedUser ?
                    <div
                        className="techLogoContainer"
                    >
                        <img 
                            src={addButton}
                            alt="add stack button"
                            className="addButton"
                            onClick={() => setAddStack(true)}
                        />
                    </div>
                    :
                    null
                }
            </div>
        </>
    )
}