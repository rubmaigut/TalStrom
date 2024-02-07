import React from "react";
import Image from "next/image";
import UserRoleEditor from "@/ui/dashboard/actions-button";
import Select from "@/ui/atoms/general ui/select";
import { User } from "@/types/IUser";

interface UserTableProps {
    users: User[];
    onDelete: (sub: string) => void;
    onEdit: (userSub: string) => void;
}

