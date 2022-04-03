import axios from 'axios';
import { useEffect, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useParams } from 'react-router-dom';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Upload = () => {
  const { album } = useParams();

  const [files, setFiles] = useState([]);
  const [_data, setData] = useState([]);
  const [thumbs, setThumbs] = useState([]);
  const [, setSelected] = useState(0);

  useEffect(() => {
    const getAlbumData = async () => {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const { status, data } = await axios.get(
        `${serverUrl}/album?id=${album}`,
      );

      if (status !== 200) {
        return;
      } 

      setData(data.album.files);
    };

    getAlbumData();
  }, [album]);

  useEffect(() => {
    const getThumbsImages = async () => {
      _data.forEach(async (file) => {
        const serverUrl = process.env.REACT_APP_SERVER_URL;
        const { status, data } = await axios.get(
          `${serverUrl}/aws/s3/get?album=${album}&file=thumb-${file}`,
        );
  
        if (status !== 200) {
          return;
        }

        setThumbs((prev) => [...prev, data.data]);
      });
    };

    getThumbsImages();
  }, [_data, album]);

  // const handleFetchImage = (index) => {

  // };

  return (
    <div className="bg-red-500 h-screen w-screen flex">
      <div className="bg-blue-100 w-3/12 lg:w-3/12 xl:w-2/12 flex justify-center overflow-auto">
        <div className="grid grid-flow-row gap-8">
          {thumbs.map((thumb, index) => (
            <button
              key={index}
              type="button"
              className={`w-48 ${thumb.width > thumb.height ? 'h-28' : 'h-72'}`}
              onClick={() => setSelected(index)}
            >
              <img
                alt="from aws"
                src={`data:image/webp;base64,${thumb.data}`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="bg-yellow-200 w-9/12 lg:w-9/12 xl:w-10/12 flex flex-col">
        <div className="bg-green-200 flex">
          Header
        </div>

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
          {/* {!images.length && ( */}
          {/* )} */}

          {/* {!!images.length && (
            <img
              alt="from aws"
              src={`data:image/webp;base64,${images[selected]}`}
              className="w-6/12 h-3/6"
            />
          )} */}
        </div>
      </div>
    </div>
  )
};

export default Upload
