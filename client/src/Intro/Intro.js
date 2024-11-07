import "./Intro.css";

import linkednLogo from "../../src/assets/linkedn.png";
import gitHubLogo from "../../src/assets/gitHub.png";
import instaLogo from "../../src/assets/insta.png";

import { Link } from "react-router-dom";

import Info from "./Components/Info";
import Picture from "./Components/Picture";

import Login from "./Components/Login";
import EditInfo from "./Components/EditInfo";
import AddInstitute from "./Components/AddInstitute";

import { useState, useEffect } from "react";

export default function Intro({ 
    specificUserInfo, 
    setLoggedUser, 
    loggedUser, 
    setUserInfo,
    allInstitutes,
    setAllInstitutes
}) {
    const [login, setLogin] = useState(false)

    const [editInfo, setEditInfo] = useState(false)

    const [addInstitute, setAddInstitute] = useState(false)

    useEffect(() => {
        if (login || editInfo) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
        // Cleanup to remove the class if the component unmounts
        return () => document.body.classList.remove("no-scroll");
    }, [login, editInfo]);

    return (
        <div style={{ display: "flex", color: "white", flexDirection: "column", borderBottom: "solid"}}>
            {login ? 
                <Login 
                    setLogin={setLogin}
                    setLoggedUser={setLoggedUser}
                /> 
                : 
                null
            }

            {editInfo ?
                <EditInfo 
                    setEditInfo={setEditInfo}
                    specificUserInfo={specificUserInfo}
                    setUserInfo={setUserInfo}
                />
                :
                null
            }

            {addInstitute ? 
                <AddInstitute 
                    allInstitutes={allInstitutes}
                    setAllInstitutes={setAllInstitutes}
                    setAddInstitute={setAddInstitute}
                />
                :
                null
            }

            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <div id="socialsGrid">
                    <Link className="linkednLink" to={`${specificUserInfo.linkdn_link}`}>
                        <img 
                            src={linkednLogo} 
                            className="socialLogo" 
                            alt="linkednImg"
                        />
                    </Link>

                    <Link className="gitHubLink" to={`${specificUserInfo.git_hub_link}`}>
                        <img 
                            src={gitHubLogo} 
                            className="socialLogo" 
                            alt="gitLogo"
                        />
                    </Link>

                    <Link className="instaLink" to={`${specificUserInfo.insta_link}`}>
                        <img 
                            className="socialLogo" 
                            src={instaLogo} 
                            alt="instaLogo"
                        />
                    </Link>
                </div>
            </div>

            <div style={{ display: "grid", marginLeft: "20px", marginRight: "20px", gridTemplateColumns: "70% 30%" }}>
                <Info specificUserInfo={specificUserInfo} />

                <Picture 
                    setLogin={setLogin}
                    loggedUser={loggedUser}
                    setLoggedUser={setLoggedUser}
                    setEditInfo={setEditInfo}
                    setAddInstitute={setAddInstitute}
                />
            </div>
        </div>
    );
}
