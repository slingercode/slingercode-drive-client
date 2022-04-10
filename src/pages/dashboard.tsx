import { useState } from "react";
import { Link } from "react-router-dom";

import useAlbums from "../hooks/albums";

const Dashboard = () => {
  const [name, setName] = useState("");

  const { albums, createAlbum } = useAlbums();

  const handleCreateAlbum = async () => {
    await createAlbum(name);
    setName("");
  };

  return (
    <div>
      <div>Dashboard</div>

      <div className="flex flex-col">
        {albums.map((album) => (
          <Link key={album._id} to={`/album/${album._id}`}>
            {album.name}
          </Link>
        ))}
      </div>

      <br />
      <br />
      <br />

      <div>
        <h1>Crear Album</h1>

        <input
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        />

        <button onClick={handleCreateAlbum}>Crear Album</button>
      </div>
    </div>
  );
};

export default Dashboard;
