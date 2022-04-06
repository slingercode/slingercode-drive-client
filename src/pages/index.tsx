import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate replace to="/dashboard" />;
  }

  return (
    <div className="flex flex-col">
      <div>{`slingercode's cloud`}</div>

      <br />
      <br />

      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Log in</button>
      )}
    </div>
  );
};

export default Home;
