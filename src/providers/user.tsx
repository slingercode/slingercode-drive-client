import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode, useEffect, useState } from "react";

import axiosInstance from "../config/axios";
import { LOCALSTORAGE_TOKEN } from "../utils/contants";

type UserProps = {
  children: ReactNode;
};

const User = ({ children }: UserProps): JSX.Element => {
  const { user, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();

  const [, setCurrentUser] = useState<{
    _id: string;
    name: string;
    email: string;
    auth0: string;
    username: string;
  } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (isAuthenticated && user && user.sub && user.name && user.email) {
          const token = await getAccessTokenSilently();

          localStorage.setItem(LOCALSTORAGE_TOKEN, token);

          const response = await axiosInstance.get("/me", {
            headers: {
              Authorization: `Bearer ${token}`,
              "User-Sub": user.sub,
              "User-Name": user.name,
              "User-Email": user.email,
            },
          });

          if (!response.data) {
            throw new Error();
          }

          setCurrentUser(response.data);
        }
      } catch (error) {
        logout({ returnTo: window.location.origin });
      }
    })();
  }, [user, isAuthenticated, getAccessTokenSilently, logout]);

  return <>{children}</>;
};

export default User;
