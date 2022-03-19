import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
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
    <div className="flex flex-col">
      <div>
        {`slingercode's cloud: Server connection ${connection}`}
      </div>
    </div>
  );
};

export default Home
