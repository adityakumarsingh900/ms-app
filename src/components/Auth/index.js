import React, { useContext } from "react";
import MsContext from "../../MsContext";
import { scopes } from "../../constants";
import "./index.css"

function Auth() {
    const { msalClient, account } = useContext(MsContext);

    function login(e) {
        e.preventDefault();
        msalClient.loginRedirect({
          scopes
        });
    }

    function logout(e) {
        e.preventDefault();
        msalClient.logoutRedirect();
      }

    return (
        <div className={`auth ${account?.name ? "heading" : ""}`}>
            {account 
                ? <div className="header">
                    <h1 className="name">Welcome back, {account.name}</h1>
                    <button className="button logout" onClick={logout}>Logout</button>
                </div>
                : <>
                <div className="login-container">
                    <h3>Please login to continue,</h3>
                    <button className="button" onClick={login}>Login</button>
                </div>
                </>
            }
        </div>
    );
}

export default Auth;