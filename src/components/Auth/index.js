import React, { useContext } from "react";
import MsContext from "../../MsContext";
import { scopes } from "../../constants";

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
        <div>
            {account 
                ? <>
                    <p>Logged in as {account.name}</p>
                    <button onClick={logout}>Logout</button>
                </>
                : <>
                    <button onClick={login}>Login</button>
                </>
            }
        </div>
    );
}

export default Auth;