import { FileType } from "../types/albums";

type ThumbsProps = {
  thumbs: FileType[];
  handleFetchImage: (index: number) => Promise<void>;
};

const Thumbs = ({ thumbs, handleFetchImage }: ThumbsProps) => {
  return (
    <>
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

          <p className="text-sm text-gray-font-low">{thumb.name}</p>
        </button>
      ))}
    </>
  );
};

export default Thumbs;
