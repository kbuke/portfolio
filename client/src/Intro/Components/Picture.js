import { useState } from "react"
import profilePic from "../../assets/profilePic.jpeg"

import LogOut from "./LogOut"

import "./Picture.css"

export default function Picture({
    setLogin,
    loggedUser,
    setLoggedUser,
    setEditInfo,
    setAddInstitute
}){
    const [hoverLogin, setHoverLogin] = useState(false)
    const [logOut, setLogOut] = useState(false)

    return(
        <div>
            <img 
                src={profilePic}
                alt="profileImg"
                style={{
                    maxWidth: "100%",
                    zIndex: "-0.5",
                    marginBottom: "20px",
                    height: "500px"
                }}
            />
            {loggedUser ?
                <>
                    <div
                        id="loggedInOptionsGrid"
                    >
                        <button
                            onClick={() => setLogOut(true)}
                        >
                            Logout
                        </button>

                        <button
                            onClick={() => setEditInfo(true)}
                        >
                            Edit your information
                        </button>

                        <button
                            onClick={() => setAddInstitute(true)}
                        >
                            Add Institute
                        </button>
                    </div>

                    {logOut ? 
                        <LogOut 
                            setLogOut={setLogOut}
                            setLoggedUser={setLoggedUser}
                        />
                        :
                        null
                    }
                </>
                :
                <button
                    className="loginButton"
                    onMouseEnter={() => setHoverLogin(true)}
                    onMouseLeave={() => setHoverLogin(false)}
                    id={hoverLogin? "showLogin" : ""}
                    style={{justifySelf: "center", alignSelf: "center"}}
                    onClick={() => setLogin(true)}
                >
                    Login
                </button>
            }
        </div>
    )
}