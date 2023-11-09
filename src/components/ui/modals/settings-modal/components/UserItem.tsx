import { deleteUser, getUsersAsync } from "@/features";
import { useSpinner } from "@/hooks/context";
import { useAppDispatch } from "@/hooks/store";
import { User } from "@/types";
import Delete from "../../../icons/Close";
import React from "react";

interface UserItemProps {
  user: User;
}

export const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const { hideSpinner, showSpinner } = useSpinner();

  const handleDelete = () => {
    new Promise((resolve) => {
      showSpinner();
      resolve(true);
    })
      .then(() => dispatch(deleteUser(user.id!)))
      .then(() => dispatch(getUsersAsync()))
      .finally(() => hideSpinner());
  };

  return (
    <div className="px-4 py-2 border-b last:border-b-0 flex justify-between">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">{user.username}</h3>
        <p className="text-gray-600">
          Роль: <span className="capitalize">{user.role?.toLowerCase()}</span>
        </p>
      </div>

      <button
        className="bg-red-500 p-2 rounded-md hover:bg-red-600"
        onClick={handleDelete}
      >
        <Delete className="w-4 h-4 fill-white" />
      </button>
    </div>
  );
};
