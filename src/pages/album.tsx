import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import useAlbum from "../hooks/album";
import { FileType } from "../types/albums";
import axiosInstance from "../config/axios";
import DialogUpload from "../components/dialog-upload";
import { UserContextProvider } from "../providers/user";
import Thumbs from "../components/thumbs";
import ImageView from "../components/image";

const Upload = () => {
  const { album } = useParams();
  const currentUser = useContext(UserContextProvider);

  const { albumFiles, thumbs } = useAlbum(album);

  const [files, setFiles] = useState<any[]>([]);
  const [image, setImage] = useState<FileType | undefined>();

  const handleFetchImage = async (index: number) => {
    if (!currentUser) {
      return;
    }

    const { status, data } = await axiosInstance.get(
      `/aws/s3/get?user_id=${currentUser._id}&album_id=${album}&file_name=${albumFiles[index]}`,
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      },
    );

    if (status !== 200) {
      return;
    }

    setImage(data.data);
  };

  const handlePreviewImage = () => {
    if (image) {
      const preview = new Image();
      preview.src = `data:image/webp;base64,${image.data}`;

      const w = window.open("");
      w?.document.write(preview.outerHTML);
    }
  };

  if (!currentUser) {
    return <>validating...</>;
  }

  return (
    <div className="h-[90vh] flex">
      <div className="w-3/12 lg:w-3/12 xl:w-2/12 flex justify-center overflow-auto">
        <div className="pt-10 flex flex-col">
          <Thumbs thumbs={thumbs} handleFetchImage={handleFetchImage} />
        </div>
      </div>

      <div className="w-9/12 lg:w-9/12 xl:w-10/12 flex flex-col">
        <div className="h-[5%] py-1 px-5 flex justify-end">
          <div className="w-20 flex justify-evenly items-center">
            {image && (
              <button onClick={handlePreviewImage}>
                <OpenInNewWindowIcon width={20} height={20} />
              </button>
            )}

            <DialogUpload
              files={files}
              album={album}
              currentUser={currentUser}
              setFiles={setFiles}
            />
          </div>
        </div>

        <div className="h-[95%] flex justify-center items-center">
          <ImageView image={image} />
        </div>
      </div>
    </div>
  );
};

export default Upload;
