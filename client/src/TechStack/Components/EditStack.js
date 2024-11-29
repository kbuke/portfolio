import "./EditStack.css"

export default function EditStack({
    selectedStackId,
    selectStackName,
    setSelectStackName,
    setEditStack,
    editStackImg,
    setEditStackImg,
    editStackExperience,
    setEditStackExperience,
    techStack,
    setTechStack
}){

    const handleEdit = e => {
        fetch(`/technologies/${selectedStackId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                logo: editStackImg,
                name: selectStackName,
                experience: editStackExperience
            })
        })
        .then(r => {
            if(r.ok) {
                return r.json()
            } else {
                return null 
            }
        })
        .then(editedInfo => {
            if(editedInfo){
                setTechStack(techStack.map(oldTechStack => 
                    oldTechStack.id === editedInfo.id ? editedInfo : oldTechStack
                ))
            }
        })
        .then(setEditStack(false))
    }

    return(
        <div
            id="popUp"
        >
            <form
                onSubmit={handleEdit}
                id="editStackForm"
            >
                <h2>Edit Stack</h2>

                <input 
                    onChange={(e) => setSelectStackName(e.target.value)}
                    type="text"
                    className="editStackContainer"
                    placeholder="Enter stack name"
                    value={selectStackName}
                />

                <input 
                    className="editStackContainer"
                    onChange={(e) => setEditStackImg(e.target.value)}
                    type="text"
                    value={editStackImg}
                    placeholder="Enter stack image"
                />

                <input 
                    className="editStackContainer"
                    onChange={(e) => setEditStackExperience(e.target.value)}
                    placeholder="Enter time with stack"
                    type="text"
                    value={editStackExperience}
                />

                <div
                    style={{display: "grid", marginBottom: "10px", gap: "20px", gridTemplateColumns: "repeat(2, 1fr)", marginLeft: "5px", marginRight: "5px"}}
                >
                    <button
                        type="submit"
                    >
                        Confirm Changes
                    </button>

                    <button
                        onClick={() => setEditStack(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}