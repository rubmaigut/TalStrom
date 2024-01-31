import { signIn, useSession } from "next-auth/react";
import Link from "next/dist/client/link";
import { FC } from "react";

const SignIn: FC = () => {
  const { data: session } = useSession();
  return (
    <div>
      {!session && (
        <>
          <span className="custom-not-signed-in-text">
            You are not signed in
          </span>
          <Link
            href={`/api/auth/signin`}
            className="custom-button-primary"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign in
          </Link>
        </>
      )}
    </div>
  );
};

export default SignIn;
