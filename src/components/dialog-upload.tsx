import { Dispatch } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { UploadIcon } from "@radix-ui/react-icons";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { UserType } from "../types/user";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

type DialogUploadProps = {
  files: any;
  album: string | undefined;
  currentUser: UserType | null;
  setFiles: Dispatch<React.SetStateAction<any[]>>;
};

const DialogUpload = ({
  files,
  album,
  currentUser,
  setFiles,
}: DialogUploadProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <UploadIcon width={20} height={20} />
      </Dialog.Trigger>

      <Dialog.Content className="fixed bg-gray-background-component p-5 top-1/2 left-1/2 w-5/12 -translate-x-1/2 -translate-y-1/2 rounded-sm border border-gray-border-interactive">
        {currentUser && (
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
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogUpload;
