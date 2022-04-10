import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import axiosInstance from "../config/axios";
import { FileType } from "../types/albums";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import useAlbum from "../hooks/album";
import { UserContextProvider } from "../providers/user";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

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

  if (!currentUser) {
    return <>validating...</>;
  }

  return (
    <div className="bg-red-500 h-screen w-screen flex">
      <div className="bg-blue-100 w-3/12 lg:w-3/12 xl:w-2/12 flex justify-center overflow-auto">
        <div className="pt-10 flex flex-col">
          {thumbs.map((thumb, index) => (
            <button
              key={index}
              type="button"
              className={`${index !== 0 ? "mt-20" : ""} w-48 ${
                thumb.width > thumb.height ? "h-28" : "h-72"
              }`}
              onClick={() => handleFetchImage(index)}
            >
              <img
                alt="from aws"
                src={`data:image/webp;base64,${thumb.data}`}
              />

              <p className="text-red-400">{thumb.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-yellow-200 w-9/12 lg:w-9/12 xl:w-10/12 flex flex-col">
        <div className="bg-green-200 flex">Header</div>

        <div>
          <FilePond
            name="files"
            maxFiles={3}
            files={files}
            allowMultiple={true}
            onupdatefiles={setFiles}
            server={{
              url: process.env.REACT_APP_SERVER_URL,
              process: {
                url: `/aws/s3/upload?user_id=${currentUser._id}&album_id=${album}`,
                method: "POST",
                headers: {
                  Authorization: `Bearer ${currentUser.token}`,
                },
              },
            }}
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
        </div>

        <div className="bg-purple-500 h-full flex justify-center items-center">
          {image && (
            <div
              className={`${image.width > image.height ? "w-5/6" : "w-3/6"}`}
            >
              <img alt="full" src={`data:image/webp;base64,${image.data}`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
