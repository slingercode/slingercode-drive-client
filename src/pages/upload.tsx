import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import axiosInstance from "../config/axios";
import { FileType } from "../types/albums";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Upload = () => {
  const { album } = useParams();

  const [files, setFiles] = useState<any[]>([]);
  const [albumFiles, setAlbumFiles] = useState<string[]>([]);
  const [thumbs, setThumbs] = useState<FileType[]>([]);
  const [image, setImage] = useState<FileType | undefined>();
  const [, setSelected] = useState(0);

  useEffect(() => {
    (async () => {
      const { status, data } = await axiosInstance.get(`/album?id=${album}`);

      if (status !== 200) {
        return;
      }

      setAlbumFiles(data.album.files);
    })();
  }, [album]);

  useEffect(() => {
    albumFiles.forEach(async (file) => {
      const { status, data } = await axiosInstance.get(
        `/aws/s3/get?album=${album}&file=thumb-${file}`,
      );

      if (status !== 200) {
        return;
      }

      setThumbs((prev) => [...prev, data.data]);
    });
  }, [albumFiles, album]);

  const handleFetchImage = async (index: number) => {
    const { status, data } = await axiosInstance.get(
      `/aws/s3/get?album=${album}&file=${albumFiles[index]}`,
    );

    if (status !== 200) {
      return;
    }

    setImage(data.data);
  };

  return (
    <div className="bg-red-500 h-screen w-screen flex">
      <div className="bg-blue-100 w-3/12 lg:w-3/12 xl:w-2/12 flex justify-center overflow-auto">
        {/* <div className="grid grid-flow-row gap-8"> */}
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
              <img alt="from aws" src={`data:image/webp;base64,${thumb.data}`} />
              <p>{thumb.name}</p>
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
            server={`${process.env.REACT_APP_SERVER_URL}/aws/s3/upload?album=${album}`}
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
        </div>

        <div className="bg-purple-500 h-full flex justify-center items-center">
          {image && (
            <div className={`${image.width > image.height ? "w-5/6" : "w-3/6"}`}>
              <img alt="full" src={`data:image/webp;base64,${image.data}`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
