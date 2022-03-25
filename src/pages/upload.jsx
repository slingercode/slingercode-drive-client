import { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Upload = () => {
  const [files, setFiles] = useState([]);

  return (
    <div>
      <div>Upload</div>

      <FilePond
        name="files" 
        maxFiles={3}
        files={files}
        allowMultiple={true}
        onupdatefiles={setFiles}
        server={`${process.env.REACT_APP_SERVER_URL}/aws/upload`}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  )
};

export default Upload
