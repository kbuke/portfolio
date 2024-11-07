

export default function EditPoints({
    pointId,
    point,
    setPoint,
    setEditPoint,
    projectPoints,
    setProjectPoints
}){
    const handleEdit = e => {
        e.preventDefault()
        fetch(`/points/${pointId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                point: point
            })
        })
        .then(r => {
            if(r.ok){
                return r.json()
            } else {
                return null
            }
        })
        .then(editedPoint => {
            if(editedPoint){
                setProjectPoints(projectPoints.map(oldPoints => 
                    oldPoints.id === editedPoint.id ? editedPoint : oldPoints
                ))
            }
        })
        .then(setEditPoint(false))
    }

    return(
        <div
            id="popUp"
        >
            <form
                style={{width: "600px", textAlign: "center", backgroundColor: "white", color: "black", display: "flex", flexDirection: "column"}}
                onSubmit={handleEdit}
            >
                <h2>Edit Point</h2>

                <input 
                    type="text"
                    value={point}
                    onChange={(e) => setPoint(e.target.value)}
                    placeholder="Edit point info"
                />

                <div
                    style={{display: "grid", gridTemplateColumns: "40% 40%", justifyContent: "center", alignItems: "center", gap: "20px", marginBottom: "20px"}}
                >
                    <button
                        type="submit"
                    >
                        Make Edit
                    </button>

                    <button
                        onClick={() => setEditPoint(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}