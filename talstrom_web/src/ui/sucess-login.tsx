import { Session } from "inspector";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SuccessLogin: NextPage<LoginProps> = ({ user, jwt }) => {
  const [loading, setLoading] = useState(true); // Manage loading state
  const router = useRouter();

  const adminEmail = "maidelin.rubio@appliedtechnology.se";
  const isAdmin = user?.email === adminEmail;

  const addUserHandler = async (user: UserProps, jwt: { sub: string }) => {
    try {
      const response = await fetch("http://localhost:5000/api/Users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          picture: user.image,
          sub: jwt.sub,
        }),
      });

      if (response.ok) {
        console.log("User created")}
    } catch (error) {
      console.error("Error during fetch", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      router.push('/admin');
    } else {
      addUserHandler(user, jwt).then(() => {
        setLoading(false);
      }).catch((error) => {
        console.error("Failed to add user", error);
        setLoading(false);
      });
    }
  }, [isAdmin, router, user, jwt]);

  if (loading && !isAdmin) {
    return <p>Loading... 🔄</p>;
  }

  return (
    <>
      {isAdmin ? null : (
        <p className="text-gray-800">
          <strong>Now you are a user! 🎊 </strong>
          Your role will be assigned soon, {user.name}.
        </p>
      )}
    </>
  );
};
export default SuccessLogin;
