import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    const getConnection = async () => {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const { status } = await axios.get(`${serverUrl}/ping`);
      setConnection(status === 200 ? true : false);
    };

    getConnection();
  }, []);

  return (
    <div>
      slingercode cloud
      <div>{connection ? "Server" : "No connection"}</div>
    </div>
  );
};

export default App;
