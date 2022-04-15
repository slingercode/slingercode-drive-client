import { FileType } from "../types/albums";

type ImageProps = {
  image: FileType | undefined;
};

const Image = ({ image }: ImageProps) => {
  if (image && image.height > image.width && image.height > 2048) {
    return (
      <div className="w-5/12 xl:w-3/12 lg:w-4/12 md:w-2/12">
        <img alt="full" src={`data:image/webp;base64,${image.data}`} />
      </div>
    );
  }

  return (
    <>
      {image && (
        <div
          className={`${
            image.width > image.height
              ? "w-5/6 xl:w-8/12"
              : "w-3/6 xl:w-4/12 lg:w-6/12"
          }`}
        >
          <img alt="full" src={`data:image/webp;base64,${image.data}`} />
        </div>
      )}
    </>
  );
};

export default Image;
