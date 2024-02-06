import Image from "next/image";

type MailImageProps = {
  picture: string;
  name: string;
  email: string;
};

export function MailImage({ picture, name, email }: MailImageProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <dd className="my-2 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
        <Image
          src={`${picture}`}
          alt={`Photo profile${name}`}
          className="rounded-full"
          width={80}
          height={80}
          priority
        />
      </dd>
      <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2 ">
        {email || name}
      </dd>
    </div>
  );
}
