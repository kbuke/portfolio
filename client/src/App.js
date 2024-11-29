import './App.css';

import {useEffect, useState} from "react"

import Home from './HomePg/Home';


function App() {
  //Set state for user info
  const [userInfo, setUserInfo] = useState([])

  //Set state for technologies
  const [techStack, setTechStack] = useState([])

  //Set state for projects
  const [projects, setProjects] = useState([])

  //Set state for emails
  const [allEmails, setAllEmails] = useState([])

  //Set state for logged user
  const [loggedUser, setLoggedUser] = useState([])

  //Set state for registered institutes
  const [allInstitutes, setAllInstitutes] = useState([])

  //Set state for project stacks
  const [projectStack, setProjectStack] = useState([])

  //Set state for project points
  const [projectPoints, setProjectPoints] = useState([])

  //Fetch user info
  useEffect(() => {
    fetch("/profile")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r 
    })
    .then(profiles => setUserInfo(profiles))
  }, [])

  //Fetch known tech
  useEffect(() => {
    fetch("technologies")
    .then(r => {
      if(r.ok){
        return r.json()
      }
      throw r 
    })
    .then(technologies => setTechStack(technologies))
  }, [])

  //Fetch projects
  useEffect(() => {
    fetch("/projects")
    .then(r => {
      if(r.ok){
        return r.json()
      }
      throw r 
    })
    .then(project => setProjects(project))
  }, [])

  useEffect(() => {
    fetch("/emails")
    .then(r => {
      if(r.ok){
        return r.json()
      }
      throw r 
    })
    .then(email => setAllEmails(email))
  }, [])

  //Fetch all institutes
  useEffect(() => {
    fetch("/institutes")
    .then(r => {
      if(r.ok){
        return r.json()
      }
      throw r 
    })
    .then(institutes => setAllInstitutes(institutes))
  }, [])

  //Fetch logged user
  useEffect(() => {
    fetch("/check_session")
    .then(r => {
      if(r.ok) {
        return r.json()
        .then(loggedUser => {
          if(loggedUser.message === "Unauthorized user"){
            setLoggedUser(null)
          } else {
            setLoggedUser(loggedUser)
          }
        })
      }
    })
  }, [])

  //Fetch project points
  useEffect(() => {
    fetch("/points")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r 
    })
    .then(points => setProjectPoints(points))
  }, [])

  //Fetch project stack
  useEffect(() => {
    fetch("/projecttech")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r 
    })
    .then(tech => setProjectStack(tech))
  }, [])

  return(
    <div
      style={{
        backgroundColor: "black",
      }}
    >
      <Home 
        userInfo={userInfo}
        setUserInfo={setUserInfo}

        techStack={techStack}
        setTechStack={setTechStack}

        projects={projects}
        setProjects={setProjects}

        allEmails={allEmails}
        setAllEmails={setAllEmails}

        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}

        allInstitutes={allInstitutes}
        setAllInstitutes={setAllInstitutes}

        projectStack={projectStack}
        setProjectStack={setProjectStack}

        projectPoints={projectPoints}
        setProjectPoints={setProjectPoints}
      />
    </div>
  )

  
}

export default App;
