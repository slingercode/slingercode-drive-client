import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [connection, setConnection] = useState(false);
  const [webpImage, setWebpImage] = useState(null);

  useEffect(() => {
    const getConnection = async () => {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const { status } = await axios.get(`${serverUrl}/ping`);
      setConnection(status === 200 ? true : false);
    };

    getConnection();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const response = await axios.post(`${serverUrl}/aws/get`, {
        folder: 'noel',
        file: '1617753568923.webp',
      });

      setWebpImage(response.data);
    };

    getData();
  }, []);

  return (
    <div className="flex flex-col">
      <div>
        {`slingercode's cloud: Server connection ${connection}`}
      </div>

      <div>
        <Link to="upload">
          Go to Upload
        </Link>
      </div>

      <div className="flex flex-col items-center">
        WEBP Image

        {webpImage && (
          <img
            alt="from aws"
            src={`data:image/webp;base64,${webpImage}`}
            className="mt-5 w-8/12"
          />
        )}
      </div>
    </div>
  );
};

export default Home
