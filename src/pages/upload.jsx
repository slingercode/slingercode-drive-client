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
  const { user, album } = useParams();

  const [files, setFiles] = useState([]);
  const [_data, setData] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getAlbumData = async () => {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const { status, data } = await axios.post(
        `${serverUrl}/aws/get-album`,
        {
          user,
          album,
        },
      );

      if (status !== 200) {
        return;
      } 

      setData(data.data);
    };

    getAlbumData();
  }, [user, album]);

  useEffect(() => {
    const getImages = async () => {
      _data.forEach(async (file) => {
        const serverUrl = process.env.REACT_APP_SERVER_URL;
        const { status, data } = await axios.post(
          `${serverUrl}/aws/get`,
          {
            user,
            album,
            file,
          },
        );
  
        if (status !== 200) {
          return;
        } 
  
        // setData(data.data);
        console.log(data);
        setImages((prev) => [...prev, data]);
      });
    };

    getImages();
  }, [_data, user, album]);

  return (
    <div>
      <div>Upload</div>

      <FilePond
        name="files" 
        maxFiles={3}
        files={files}
        allowMultiple={true}
        onupdatefiles={setFiles}
        server={`${process.env.REACT_APP_SERVER_URL}/aws/upload?user=${user}&album=${album}`}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />

      {!_data.length && !images.length && (
        <div>No data</div>
      )}

      {!!_data.length && !!images.length && (
        <div>
          {images.map((el, index) => (
            <img
              key={index}
              alt="from aws"
              src={`data:image/webp;base64,${el}`}
              className="mt-5 w-8/12"
            />
          ))}
        </div>
      )}
    </div>
  )
};

export default Upload
