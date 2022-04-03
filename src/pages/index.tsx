import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [connection, setConnection] = useState(false);
  const [name, setName] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const getConnection = async () => {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const { status } = await axios.get(`${serverUrl}/ping`);
      setConnection(status === 200 ? true : false);
    };

    getConnection();
    name;
  }, []);

  useEffect(() => {
    const getData = async () => {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const { status, data } = await axios.get(`${serverUrl}/albums`);

      if (status !== 200) {
        return;
      }

      setAlbums(data.albums);
    };

    getData();
  }, []);

  const handleCreateAlbum = async () => {
    if (!name || name.trim() === "") {
      console.log("nel");
      return;
    }

    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { status, data } = await axios.post(`${serverUrl}/album`, {
      album: name,
    });

    if (status !== 200) {
      return;
    }

    setName("");
    setAlbums((prev) => [
      ...prev,
      { _id: data.album._id, name: data.album.name },
    ]);
  };

  return (
    <div className="flex flex-col">
      <div>{`slingercode's cloud: Server connection ${connection}`}</div>

      <div>
        <div>Albums</div>

        {!albums.length && (
          <>
            <div>No hay albums</div>

            <input
              value={name}
              placeholder="Name"
              onChange={(event) => setName(event.target.value)}
            />

            <button onClick={handleCreateAlbum}>Crear Album</button>
          </>
        )}

        {!!albums.length && (
          <div>
            Data
            {albums.map((album) => (
              <div key={album._id}>
                <Link to={`album/${album._id}`}>{album.name}</Link>
              </div>
            ))}
            <div>Crear</div>
            <input
              placeholder="Name"
              onChange={(event) => setName(event.target.value)}
            />
            <button onClick={handleCreateAlbum}>Crear Album</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
