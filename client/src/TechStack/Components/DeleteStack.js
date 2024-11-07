import "./DeleteStack.css"

export default function DeleteStack({
    setDeleteStack,
    selectStackName,
    selectedStackId,
    techStack,
    setTechStack,  
    setSelectedStackId
}){

    console.log(`I have chosen to delete ${selectStackName} with an id of ${selectedStackId}`)

    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`/technologies/${selectedStackId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok){
                    setTechStack(stacks => stacks.filter(stack => stack.id !== selectedStackId))
                }
            })
            .then(setSelectedStackId())
            .then(setDeleteStack(false))
    }

    return(
        <div
            id="popUp"
        >
            <form
                id="deleteStackContainer"
                onSubmit={handleDelete}
            >
                <h2
                    className="popUpTitle"
                >
                    Delete {selectStackName}?
                </h2>

                <div>
                    <button
                        type="submit"
                    >
                        Confirm
                    </button>

                    <button
                        onClick={() => setDeleteStack(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}