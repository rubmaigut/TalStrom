import { ChangeEvent, useState } from "react";
import { BiLoaderCircle, BiCheckCircle } from "react-icons/bi";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { BiCross } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { addMedia } from "@/lib/data";

type UploadError = {
  type: string;
  message: string;
};

type UploadContainerProps = {
  closeWindow: () => void;
  sub: string;
  mediaType: string
};

const UploadContainer = ({ closeWindow, sub, mediaType }: UploadContainerProps) => {
  const [fileDisplay, setFileDisplay] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<UploadError | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const uploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const files = event.target.files;

    if (files && files.length) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);

      await setFileDisplay(fileUrl);
      await setFile(file);

      setIsUploading(false);
    }
  };

  const discardMediaHandler = () => {
    setFile(null);
    setFileDisplay("");
  };

  const uploadMediaToCloud = async () => {
    if (!file) {
      return;
    }

    await addMedia(file as File, sub, mediaType);
    discardMediaHandler();
  };

  return (
    <div
      id="upload-video-overlay"
      className="fixed flex justify-center align-middle items-center z-10 left-0 top-0 w-full h-screen bg-white overflow-auto"
    >
      <div className="container w-[300px] top-12 md:top-40">
      <button className="mx-8" onClick={closeWindow}>
        <GiCancel size="30" />
      </button>
      <div>
        <h1 className="text-[23px] font-semibold my-2 mx-8">Upload {mediaType.toLowerCase()}</h1>
        <h2 className="text-gray-400 mt-1 mx-8">Post a {mediaType.toLowerCase()} to your account</h2>
      </div>

      <div className="mt-8 md:flex flex-col gap-6 max-w-80 items-center justify-center">
        {!fileDisplay ? (
          <label
            htmlFor="input"
            className="
    md:mx-0
    mx-auto
    mt-4
    mb-6
    flex
    flex-col
    items-center
    justify-center
    w-full
    max-w-[260px]
    h-[470px]
    text-center
    p-3
    border-2
    border-dashed
    border-gray-300
    rounded-lg
    hover:bg-gray-100
    cursor-pointer
    "
          >
            <div className="text-[#b3b3b3] w-1/3 mx-auto">
              <CloudArrowUpIcon />
            </div>
            <p className="mt-4  text-[17px]">Select {mediaType.toLowerCase()} to upload</p>
            <p className="mt-1.5 text-gray-500 text-[13px]">
              Or drag and drop file
            </p>
            <p className="mt-12 text-gray-400 text-sm">{mediaType === "Video" ? "MP4" : mediaType === "Image" ? "JPG" : ""}</p>
            <p className="mt-2 text-gray-400 text-[13px]">Less than 600MB</p>
            <label
              htmlFor="fileInput"
              className="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#14b8a6] rounded-sm cursor-pointer"
            >
              Select File
            </label>
            <input
              id="fileInput"
              onChange={uploadHandler}
              hidden
              accept={mediaType === "Video" ? ".mp4" : mediaType === "Image" ? ".jpg" : ""}
              capture={"environment"}
              type="file"
            />
          </label>
        ) : (
          <div
            className="
          md:mx-0
          mx-auto
          mt-4
          md:mb-12
          mb-16
          flex
          items-center
          justify-center
          w-full
          max-w-[260px]
          h-[470px]
          p-3
          border-2
        border-solid
        border-gray-300
          rounded-lg
          cursor-pointer
          relative"
          >
            {isUploading ? (
              <div className="absolute flex items-center justify-center z-20 bg-black h-full w-full rounded-lg bg-opacity-50">
                <div className="mx-auto flex items-centerjustify-center gap-1">
                  <BiLoaderCircle
                    className="animate-spin"
                    color="#f12b56"
                    size={30}
                  />
                  <div className="text-white font-bold">Uploading...</div>
                </div>
              </div>
            ) : null}

            <video
              className="absolute rounded-xl object-cover z-10 p-[13px] w-full-h-full"
              autoPlay
              loop
              muted
              src={fileDisplay}
            />

            <div className="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border w-full p-2 border-gray-300">
              <div className="flex items-center truncate">
                <BiCheckCircle size="16" className="min-w-[16px]" />
                <p className="text-[11px] pl-1 truncate text-ellipsis">
                  {file ? file.name : ""}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center justify-center mt-4 mb-6">
          <button
            disabled={isUploading}
            onClick={() => discardMediaHandler()}
            className="px-10 py-2.5 mt-2 mx-1 border text-black bg-white rounded-sm"
          >
            Discard
          </button>
          <button
            disabled={isUploading}
            onClick={() => uploadMediaToCloud()}
            className={`px-10 py-2.5 mt-2 mx-1 border text-white ${
              file && fileDisplay.length ? "bg-[#14b8a6]" : "bg-gray-300"
            } rounded-sm`}
          >
            {isUploading ? (
              <BiLoaderCircle
                className="animate-spin"
                color="#f12b56"
                size={30}
              />
            ) : (
              "Upload"
            )}
          </button>
        </div>
        {error ? (
          <div className="text-red-400 mt-4">{error.message}</div>
        ) : null}
      </div>
      </div>
      
    </div>
  );
};

export default UploadContainer;
