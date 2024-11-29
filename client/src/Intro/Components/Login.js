import { useState } from "react"
import "./Login.css"

export default function Login({
    setLogin,
    setLoggedUser
}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [logInError, setLogInError] = useState(false)

    const handleLogin = e => {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password})
        }).then((r) => {
            if(r.ok) {
                return r.json()
            } else {
                setLogInError(true)
            }
        })
        .then(user => {
            if(user) {
                setLoggedUser(user)
                setLogin(false)
            }
        })
    }
    return(
        <form
            id="popUp"
            onSubmit={handleLogin}
        >
            <div
                id="loginContainer"
            >
                {logInError ?
                    <div
                        style={{backgroundColor: "red", textAlign: "center"}}
                    >
                        <h3
                            style={{color: "white"}}
                        >
                            Error Logging In
                        </h3>
                    </div>
                    :
                    null
                }
                <h2 style={{fontSize: "200%", textDecoration: "underline"}}>Please Login Below</h2>

                <input 
                    type="text"
                    placeholder="Please enter email"
                    className="loginInput"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input 
                    type="password"
                    placeholder="Please enter password"
                    className="loginInput"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div
                    id="loginButtonGrid"
                >
                    <button
                        type="submit"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => setLogin(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    )
}