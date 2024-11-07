import "./Email.css"

import NewEmail from "../Projects/Components/NewEmail"

export default function Email({
    allEmails,
    setAllEmails
}){
    return(
        <div
            id="emailContainer"
        >
            <div
                style={{color: "white", marginLeft: "20px"}}
            >
                <h1>If you are interested to learn more, please send me an email!</h1>
            </div>

            <NewEmail 
                allEmails={allEmails}
                setAllEmails={setAllEmails}
            />
        </div>
    )
}