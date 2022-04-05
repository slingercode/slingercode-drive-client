import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode, useEffect } from "react";

import axiosInstance from "../config/axios";

type UserProps = {
  children: ReactNode;
};

const User = ({ children }: UserProps): JSX.Element => {
  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          console.log(token);

          const response = await axiosInstance.get("/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log(response);
        }
      } catch (error) {
        logout({ returnTo: window.location.origin });
      }
    })();
  }, [isAuthenticated, getAccessTokenSilently, logout]);

  return <>{children}</>;
};

export default User;
