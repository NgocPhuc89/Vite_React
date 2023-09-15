
import { useState } from "react";

function TowWayBinding() {
    const [state, setState] = useState({
        "email": '',
        "usename": '',
        "phone": ''
    })
    const show = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const login = (e) => {
        e.preventDefault();
        alert(JSON.stringify(state))
    }
    return (
        <form onSubmit={login}>
            <h2 className="text-success" >Register</h2>
            <div>
                <label>Email</label>
                <input name="email" onInput={show} />
            </div>
            <div>
                <label>Username</label>
                <input name="username" onInput={show} />
            </div>
            <div>
                <label>Password</label>
                <input name="password" onInput={show} />
            </div>
            <div>
                <button type="submit">Register</button>
                <button type="reset">Cancel</button>
            </div>

        </form>
    )
}

export { TowWayBinding };