import { signIn } from "next-auth/react";
import Link from "next/link";

interface AccessDeniedProps {
  role: string;
}

export default function AccessDenied({ role }: AccessDeniedProps) {
  return (
    <>
      <h1>Access Denied</h1>
      <p>
        <Link
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >{`You must be ${role} to view this page`}</Link>
      </p>
    </>
  );
}
