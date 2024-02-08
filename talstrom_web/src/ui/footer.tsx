import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white w-full px-6 mt-6">
      <div className="text-gray-700 flex items-center p-4">
        <div className="flex justify-center items-center">
          <div className="mr-2">
            <Link
              href="https://tal-strom.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/talstrom-short.png"
                alt="remote home animation"
                className="w-full h-full object-contain"
                width={40}
                height={40}
                priority
              />
            </Link>
          </div>
          <div>© 2024</div>
        </div>
        <div className="flex pl-4 justify-center">
          <Link href="/about" className="text-gray-700 mx-2 hover:bg-teal-100 hover:text-secondary">
            About
          </Link>
          <Link href="/policy" className="text-gray-700 mx-2">
            Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
