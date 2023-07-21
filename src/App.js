import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [msalClient, setMsalClient] = useState(null);
  const [accounts, setAccounts] = useState([]);

  function login(e) {
    e.preventDefault();
    const scopes = ['Calendars.Read'];
    msalClient.loginRedirect({
      scopes
    });
  }

  function logout(e) {
    e.preventDefault();
    msalClient.logoutRedirect();
  }

  console.log('accounts', accounts);

  useEffect(() => {
    const { msal } = window;
    const msalConfig = {
      auth: {
        clientId: '341c99e0-37f1-44e8-a93e-39c66742a1a6',
        authority: 'https://login.microsoftonline.com/consumers/'
      }
    };

    const msalClient = new msal.PublicClientApplication(msalConfig);
    setMsalClient(msalClient);

    msalClient
        .handleRedirectPromise()
        .then(response => {
          const accounts = msalClient.getAllAccounts();

          setAccounts(accounts);
        });
  }, []);
  return (
    <div className="App">
      {accounts.length === 0 ? (
        <button onClick={login}>Login</button>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  );
}

export default App;
