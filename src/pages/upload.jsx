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
  const [images, setImages] = useState([]);

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
    const getImages = async () => {
      _data.forEach(async (file) => {
        const serverUrl = process.env.REACT_APP_SERVER_URL;
        const { status, data } = await axios.get(
          `${serverUrl}/aws/s3/get?album=${album}&file=thumb-${file}`,
        );
  
        if (status !== 200) {
          return;
        } 
  
        setImages((prev) => [...prev, data]);
      });
    };

    getImages();
  }, [_data, album]);

  return (
    <div>
      <div>Upload</div>

      <FilePond
        name="files" 
        maxFiles={3}
        files={files}
        allowMultiple={true}
        onupdatefiles={setFiles}
        server={`${process.env.REACT_APP_SERVER_URL}/aws/s3/upload?album=${album}`}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />


      {!_data.length && !images.length && (
        <div>No data</div>
      )}

      {!!_data.length && !!images.length && (
        <div className="flex">
          {images.map((image, index) => (
            <img
              key={index}
              alt="from aws"
              src={`data:image/webp;base64,${image}`}
              className="mt-5 w-2/12"
            />
          ))}
        </div>
      )}
    </div>
  )
};

export default Upload
