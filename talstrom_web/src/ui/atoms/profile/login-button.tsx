import { signIn } from "next-auth/react";

interface ButtonProps {
  classNameButton?: string
  classNameTitle?: string
}

export default function LoginButton( {classNameButton, classNameTitle}: ButtonProps) {
  return (
    <button
      className={`${classNameButton} w-full max-w-sm px-4 py-2 border flex gap-2 justify-center border-slate-200 dark:border-slate-700 rounded-full text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150`}
      onClick={() => signIn("google")}
    >
      <img
        className="w-6 h-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      ></img>
      <span className={`${classNameTitle} text-primary-text text-center`}>Login with Google</span>
    </button>
  );
}
