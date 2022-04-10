import { useAuth0 } from "@auth0/auth0-react";
import { createContext, ReactNode, useEffect, useState } from "react";

import axiosInstance from "../config/axios";
import { UserType } from "../types/user";

export const UserContextProvider = createContext<UserType | null>(null);

type UserProps = {
  children: ReactNode;
};

const User = ({ children }: UserProps): JSX.Element => {
  const { user, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();

  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (isAuthenticated && user && user.sub && user.name && user.email) {
          const token = await getAccessTokenSilently();

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

          setCurrentUser({ ...response.data, token });
        }
      } catch (error) {
        logout({ returnTo: window.location.origin });
        setCurrentUser(null);
      }
    })();
  }, [user, isAuthenticated, getAccessTokenSilently, logout]);

  return (
    <UserContextProvider.Provider value={currentUser}>
      {children}
    </UserContextProvider.Provider>
  );
};

export default User;
