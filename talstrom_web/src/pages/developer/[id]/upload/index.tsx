import { ChangeEvent, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

type UploadError = {
  type: string;
  message: string;
};

const Upload = () => {
  const [fileDisplay, setFileDisplay] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<UploadError | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const uploadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);
      setFileDisplay(fileUrl);
      setFile(file);
    }
  };

  return (
    <section className="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
      <div>
        <h1 className="text-[23px] font-semibold">Upload video</h1>
        <h2 className="text-gray-400 mt-1">Post a video to your account</h2>
      </div>

      <div className="mt-8 md:flex gap-6">
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
            <p className="mt-4  text-[17px]">Select video to upload</p>
            <p className="mt-1.5 text-gray-500 text-[13px]">
              Or drag and drop file
            </p>
            <p className="mt-12 text-gray-400 text-sm">MP4</p>
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
              accept=".mp4"
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
          rounded-2xl
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
          </div>
        )}
      </div>
    </section>
  );
};

export default Upload;
