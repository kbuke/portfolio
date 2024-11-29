import { useState } from "react"
import "./NewStack.css"

export default function NewStack({
    setAddStack,
    techStack,
    setTechStack
}){
    const [stackName, setStackName] = useState("")
    const [stackLogo, setStackLogo] = useState("")
    const [stackExperience, setStackExperience] = useState("")

    const handleNewStack = e => {
        e.preventDefault()
        const jsonData = {
            stackName,
            stackLogo,
            stackExperience
        }
        fetch("/technologies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newStack => {
                setTechStack([...techStack, newStack])
            })
            .then(setAddStack(false))
    }

    return(
        <div
            id="popUp"
        >
            <form
                id="newStackContainer"
                onSubmit={handleNewStack}
            >
                <h2
                    className="popUpTitle"
                >
                    Add New Stack
                </h2>

                <input 
                    className="stackInput"
                    onChange={(e) => setStackName(e.target.value)}
                    placeholder="Enter Stack Name"
                />

                <input 
                    className="stackInput"
                    onChange={(e) => setStackLogo(e.target.value)}
                    placeholder="Enter Stack Logo"
                />

                <input 
                    className="stackInput"
                    onChange={(e) => setStackExperience(e.target.value)}
                    placeholder="Enter Stack Experience"
                />

                <div
                    id="stackButtonGrid"
                >
                    <button
                        className="addStackButton"
                        type="submit"
                    >
                        Create New Stack
                    </button>

                    <button
                        onClick={() => setAddStack(false)}
                        className="addStackButton"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}