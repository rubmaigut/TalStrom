import React, { ReactNode } from "react";
import { UserCardForUser } from "@/types/IUserCardProps";
import Image from "next/image";
import EditProfile from "./profile/edit-profile";

interface UserCardProps {
  user: UserCardForUser;
}
const userCard: React.FC<UserCardProps> = ({ user }) => (
  <div className="relative max-w-2xl mx-auto my-3">
    <div className="flex justify-between items-center text-sm">
      <EditProfile />
      <div className="flex items-center ml-4">
        <div className="text-center mr-4" style={{ width: "100px" }}>
          <p className="mb-0.5">
            {user.followers ? user.followers.length : "0"}
          </p>
          <p className="text-sm">Followers</p>
        </div>
        <div className="text-center mr-4" style={{ width: "100px" }}>
          <p className="mb-0.5">
            {user.following ? user.following.length : "0"}
          </p>
          <p className="text-sm">Following</p>
        </div>
        <div className="text-center mr-4" style={{ width: "100px" }}>
          <p className="mb-0.5">{user.posts ? user.posts.length : "No"}</p>
          <p className="text-sm">Posts</p>
        </div>
      </div>
    </div>
  </div>
);

export default userCard;
