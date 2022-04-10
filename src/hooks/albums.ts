import { useContext, useEffect, useState } from "react";

import axiosInstance from "../config/axios";
import { UserContextProvider } from "../providers/user";
import { GetAlbumType } from "../types/albums";

const useAlbums = () => {
  const currentUser = useContext(UserContextProvider);

  const [albums, setAlbums] = useState<GetAlbumType[]>([]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    (async () => {
      const { status, data } = await axiosInstance.get(
        `/albums?user_id=${currentUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );

      if (status !== 200) {
        return;
      }

      setAlbums(data.albums);
    })();
  }, [currentUser]);

  const createAlbum = async (name: string) => {
    if (!currentUser || !name || name.trim() === "") {
      return;
    }

    const { status, data } = await axiosInstance.post(
      "/album",
      {
        album: name,
        user: currentUser,
      },
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      },
    );

    if (status !== 200) {
      return;
    }

    setAlbums((prev) => [
      ...prev,
      { _id: data.album._id, name: data.album.name },
    ]);
  };

  return { albums, createAlbum };
};

export default useAlbums;
