import { useState } from "react";

import "./NewEmail.css"

export default function NewEmail({
    allEmails,
    setAllEmails
}){
    const userEmail = "kabuke13@gmail.com"

    const [emailSent, setEmailSent] = useState(false)
    const [respondAddress, setRespondAddress] = useState("")
    const [senderCompany, setSenderCompany] = useState("")
    const [emailSubject, setEmailSubject] = useState("")
    const [emailMessage, setEmailMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const jsonData = {
            userEmail, 
            respondAddress,
            senderCompany,
            emailSubject,
            emailMessage
        }
        fetch("/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newEmail => setAllEmails([...allEmails, newEmail]))
            .then(setEmailSent(true))
    }

    return(
        emailSent ?
            <div
                id="emailSentNotification"
            >
                <h2>Thank you for your email</h2>
                <h3>I will get back to you as soon as possible</h3>
            </div>
            :
            <form
                style={{display: "flex", flexDirection: "column", color: "white"}}
                onSubmit={handleSubmit}
            >
                <input 
                    placeholder="Please enter YOUR email address"
                    onChange={(e) => setRespondAddress(e.target.value)}
                    className="emailInput"
                />

                <input 
                    placeholder="Please enter the name of your company"
                    onChange={(e) => setSenderCompany(e.target.value)}
                    className="emailInput"
                />

                <input 
                    placeholder="Please enter the SUBJECT you wish to talk about"
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="emailInput"
                />

                <input 
                    placeholder="Please type a message for me to respond to."
                    onChange={(e) => setEmailMessage(e.target.value)}
                    className="emailInput"
                />

                <button
                    style={{height: "80px", borderRadius: "24px", width: "60%", alignSelf: "center", cursor: "pointer"}}
                    type="submit"
                >
                    Send Email 
                </button>
            </form>
    )
}