import "./LogOut.css"

export default function LogOut({
    setLoggedUser,
    setLogOut
}){
    const handleLogOut = e => {
        e.preventDefault()
        fetch("/logout", {
            method: "DELETE"
        })
        .then(r => {
            if(r.ok) {
                setLoggedUser(null)
            }
        })
    }
    return(
        <form
            id="logOutButtonContainer"
            onSubmit={handleLogOut}
        >
            <h3>Confirm Log-Out</h3>

            <div
                id="logOutButtonGrid"
            >
                <button
                    type="submit"
                >
                    Yes
                </button>

                <button
                    onClick={() => setLogOut(false)}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}