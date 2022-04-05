import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axiosInstance from "../config/axios";
import { GetAlbumType } from "../types/albums";

const Home = () => {
  const { user, isLoading, isAuthenticated, loginWithRedirect, logout } =
    useAuth0();

  const [name, setName] = useState("");
  const [albums, setAlbums] = useState<GetAlbumType[]>([]);

  useEffect(() => {
    (async () => {
      const { status, data } = await axiosInstance.get("/albums");

      if (status !== 200) {
        return;
      }

      setAlbums(data.albums);
    })();
  }, []);

  const handleCreateAlbum = async () => {
    if (!name || name.trim() === "") {
      return;
    }

    const { status, data } = await axiosInstance.post("/album", {
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
      <div>{`slingercode's cloud`}</div>

      <br />
      <br />

      {isLoading && <>Loading...</>}

      {!isLoading && !isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Log in</button>
      )}

      {!isLoading && isAuthenticated && (
        <div>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log out
          </button>

          <div>{JSON.stringify(user)}</div>
        </div>
      )}

      <div></div>

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
