import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [connection, setConnection] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getConnection = async () => {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const { status } = await axios.get(`${serverUrl}/ping`);
      setConnection(status === 200 ? true : false);
    };

    getConnection();
  }, []);

  useEffect(() => {
    const getImage = async () => {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const response = await axios.get(`${serverUrl}/aws`);
      setImage(response.data);
    };
  
    getImage();
  }, []);
  

  return (
    <div className="flex flex-col">
      <div>
        {`slingercode's cloud: Server connection ${connection}`}
      </div>


      <div className="flex flex-col items-center">
        Image

        {image && (
          <img
            alt="from aws"
            src={`data:image/png;base64,${image}`}
            className="mt-5 w-8/12"
          />
        )}
      </div>
    </div>
  );
};

export default Home
