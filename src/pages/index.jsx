import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [connection, setConnection] = useState(false);
  const [pngImage, setPngImage] = useState(null);
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
    const getPNGImage = async () => {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const response = await axios.get(`${serverUrl}/aws`);
      setPngImage(response.data);
    };
  
    getPNGImage();
  }, []);

  useEffect(() => {
    const getWEBPImage = async () => {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const response = await axios.get(`${serverUrl}/aws/webp`);
      setWebpImage(response.data);
    };
  
    getWEBPImage();
  }, []);

  return (
    <div className="flex flex-col">
      <div>
        {`slingercode's cloud: Server connection ${connection}`}
      </div>

      <div className="flex flex-col items-center">
        PNG Image

        {pngImage && (
          <img
            alt="from aws"
            src={`data:image/png;base64,${pngImage}`}
            className="mt-5 w-8/12"
          />
        )}
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
