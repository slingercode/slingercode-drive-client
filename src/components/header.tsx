import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, logout } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="m-5 px-5 py-2 flex justify-between border rounded-md">
      <div>
        <Link
          to="/dashboard"
          className="hover:text-gray-font-low focus-visible:outline-none focus-visible:ring focus-visible:border-gray-border-interactive focus-visible:ring-gray-border-interactive focus-visible:rounded-md"
        >
          {`slingercode's cloud`}
        </Link>
      </div>

      <div>
        <button
          className="hover:text-gray-font-low focus-visible:outline-none focus-visible:ring focus-visible:border-gray-border-interactive focus-visible:ring-gray-border-interactive focus-visible:rounded-md"
          onClick={() => logout()}
        >
          Log Out
        </button>
      </div>
    </header>
  );
};

export default Header;
