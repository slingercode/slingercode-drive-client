import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type AuthorizationProps = {
  children: ReactNode;
};

const Authorization = ({ children }: AuthorizationProps): JSX.Element => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return <>{children}</>;
};

export default Authorization;
