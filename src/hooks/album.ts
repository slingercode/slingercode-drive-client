import { useContext, useEffect, useState } from "react";

import axiosInstance from "../config/axios";
import { UserContextProvider } from "../providers/user";
import { FileType } from "../types/albums";

const useAlbum = (album: string | undefined) => {
  const currentUser = useContext(UserContextProvider);

  const [albumFiles, setAlbumFiles] = useState<string[]>([]);
  const [thumbs, setThumbs] = useState<FileType[]>([]);

  useEffect(() => {
    (async () => {
      if (!currentUser || !album) {
        return;
      }

      const { status, data } = await axiosInstance.get(
        `/album?user_id=${currentUser._id}&album_id=${album}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );

      if (status !== 200) {
        return;
      }

      setAlbumFiles(data.album.files);
    })();
  }, [currentUser, album]);

  useEffect(() => {
    if (!currentUser || !album) {
      return;
    }

    albumFiles.forEach(async (file) => {
      const { status, data } = await axiosInstance.get(
        `/aws/s3/get?user_id=${currentUser._id}&album_id=${album}&file_name=thumb-${file}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );

      if (status !== 200) {
        return;
      }

      setThumbs((prev) => [...prev, data.data]);
    });
  }, [currentUser, albumFiles, album]);

  return { albumFiles, thumbs };
};

export default useAlbum;
