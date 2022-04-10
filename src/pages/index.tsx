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
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col px-16 py-8 border border-gray-border-non-interactive rounded-md">
        <div className="mb-5">{`slingercode's cloud`}</div>

        {!isAuthenticated && (
          <button
            className="bg-gray-background-component hover:bg-gray-background-hover active:bg-gray-background-active border border-gray-border-interactive hover:border-gray-border-hover p-1 rounded-md focus:outline-none focus:ring focus:border-gray-border-interactive focus:ring-gray-border-interactive"
            onClick={() => loginWithRedirect()}
          >
            Log in
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
