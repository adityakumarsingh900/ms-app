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
                ? <div style={{
                    position: 'absolute',
                    right: '50px',
                    bottom: '50px',
                }}>
                    <p>Hi, {account.name}</p>
                    <button className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" onClick={logout}>Logout</button>
                </div>
                : <div className="content-center" style={{ marginTop: '10%' }}>
                    <p className="text-8xl">Welcome here,</p>
                    <p className="text-8xl">To Conitnue, please</p>
                    <button className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 text-8xl"
 onClick={login}>Login</button>
                </div>
            }
        </div>
    );
}

export default Auth;