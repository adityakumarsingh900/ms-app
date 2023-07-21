import { useEffect, useState } from "react";
import { scopes } from "./constants";

function useMsal() {
    const [msalClient, setMsalClient] = useState(null);
    const [account, setAccount] = useState(null);
    const [graphClient, setGraphClient] = useState(null);

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
                
              if (accounts.length > 0) setAccount(accounts[0]);
              else {
                // TODO: handle no accounts case
              }
            });
      }, []);

      useEffect(() => {
        function fetchGraphClient() {
            const { msal, MSGraphAuthCodeMSALBrowserAuthProvider, MicrosoftGraph } = window;
            const authProvider = new MSGraphAuthCodeMSALBrowserAuthProvider.AuthCodeMSALBrowserAuthenticationProvider(msalClient, {
              account,
              scopes,
              interactionType: msal.InteractionType.Redirect,
            });
    
            return MicrosoftGraph.Client.initWithMiddleware({ authProvider });
        }

        if (account) {
            const client = fetchGraphClient();
            setGraphClient(client);
        }
      }, [account, msalClient]);

      return {
        msalClient,
        account,
        graphClient
      }
}

export default useMsal;