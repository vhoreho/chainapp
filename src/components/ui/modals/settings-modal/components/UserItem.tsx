import React from "react";
import { useGlobalSpinner } from "@/hooks/context";
import { UserResM } from "@/types";
import Delete from "../../../icons/Close";

interface UserItemProps {
  user: UserResM;
}

export const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const { hideSpinner, showSpinner } = useGlobalSpinner();

  const handleDelete = () => {
    new Promise((resolve) => {
      showSpinner();
      resolve(true);
    })
      // .then(() => dispatch(deleteUser(user.id!)))
      // .then(() => dispatch(getUsersAsync()))
      .finally(() => hideSpinner());
  };

  return (
    <div className="flex justify-between border-b px-4 py-2 last:border-b-0">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">{user.username}</h3>
        <p className="text-gray-600">
          Роль: <span className="capitalize">{user.role?.toLowerCase()}</span>
        </p>
      </div>

      <button className="rounded-md bg-red-500 p-2 hover:bg-red-600" onClick={handleDelete}>
        <Delete className="h-4 w-4 fill-white" />
      </button>
    </div>
  );
};
