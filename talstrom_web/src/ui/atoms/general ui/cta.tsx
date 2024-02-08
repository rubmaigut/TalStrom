import React from "react";
import Image from "next/image";

type CTAProps = {
  className: string;
  title: string;
  description: string;
  photo?: string;
};

const CTAComponent: React.FC<CTAProps> = ({
  className,
  title,
  description,
  photo,
}) => {
  return (
    <div
      className={` ${className} w-full h-full p-4 lg:px-8 lg:py-12 md:flex rounded-lg shadow-md justify-center items-center`}
    >
      {photo && (
        <div className="flex justify-center md:justify-normal md:flex-shrink-0 px-6">
          <Image
            src={`/${photo}`}
            alt={`${photo} photo`}
            className="rounded-full"
            width={80}
            height={80}
            priority
          />
        </div>
      )}
      <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
        <h2 className="uppercase text-xl text-primary-text font-semibold mb-4">
          {title}
        </h2>
        <span className="mt-2 text-gray-500">{description}</span>
      </div>
    </div>
  );
};

export default CTAComponent;
