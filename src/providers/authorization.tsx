import { ReactNode } from "react";

type AuthorizationProps = {
  children: ReactNode;
};

const Authorization = ({ children }: AuthorizationProps): JSX.Element => {
  return <>{children}</>;
};

export default Authorization;
