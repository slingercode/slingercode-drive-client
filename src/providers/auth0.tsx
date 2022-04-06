import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AppState, Auth0Provider as Auth0 } from "@auth0/auth0-react";

import UserProvider from "./user";

type Auth0ProviderProps = {
  children: ReactNode;
};

const Auth0Provider = ({ children }: Auth0ProviderProps): JSX.Element => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN || "";
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || "";
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE || "";

  const navigate = useNavigate();

  const onRedirectCallback = (appState: AppState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0
      domain={domain}
      clientId={clientId}
      audience={audience}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <UserProvider>{children}</UserProvider>
    </Auth0>
  );
};

export default Auth0Provider;
