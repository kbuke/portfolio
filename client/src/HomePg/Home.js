import Intro from "../Intro/Intro"

import TechStack from "../TechStack/TechStack"

import Projects from "../Projects/Projects"

import Email from "../Emails/Email"
import { useEffect, useState } from "react"

import addButton from "../assets/plusIcon.png"
import binIcon from "../assets/binIcon.png"
import editIcon from "../assets/editIcon.png"

export default function Home({
    userInfo,
    setUserInfo,

    techStack,
    setTechStack,

    projects,
    setProjects,

    allEmails,
    setAllEmails,

    loggedUser,
    setLoggedUser,

    allInstitutes,
    setAllInstitutes,

    projectStack,
    setProjectStack,

    projectPoints,
    setProjectPoints
}){
    const [specificUserInfo, setSpecificUserInfo] = useState([])


    useEffect(() => {
        setSpecificUserInfo(userInfo[0] ? userInfo[0] : [])
    }, [userInfo])


    return(
        <div>
            <Intro 
                specificUserInfo={specificUserInfo}
                setLoggedUser={setLoggedUser}
                loggedUser={loggedUser}
                setUserInfo={setUserInfo}
                allInstitutes={allInstitutes}
                setAllInstitutes={setAllInstitutes}
            />

            <TechStack 
                techStack={techStack}
                setTechStack={setTechStack}
                loggedUser={loggedUser}
                addButton={addButton}
                binIcon={binIcon}
                editIcon={editIcon}
            />

            <Projects 
                projects={projects}
                setProjects={setProjects}
                addButton={addButton}
                loggedUser={loggedUser}
                allInstitutes={allInstitutes}
                setAllInstitutes={setAllInstitutes}
                techStack={techStack}
                projectStack={projectStack}
                setProjectStack={setProjectStack}
                projectPoints={projectPoints}
                setProjectPoints={setProjectPoints}
                editIcon={editIcon}
                binIcon={binIcon}
            />

            <Email 
                allEmails={allEmails}
                setAllEmails={setAllEmails}
            />
        </div>
    )
}