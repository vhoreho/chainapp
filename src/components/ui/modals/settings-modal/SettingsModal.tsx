"use client";

import { useEffect } from "react";
import { getUsersAsync } from "@/features";
import { useModal } from "@/hooks/context";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { RootState } from "@/store";
import CloseIcon from "../../icons/Close";
import UserList from "./components/UserList";

export const SettingsModal = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state: RootState) => state.users);
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  return (
    <div className="w-[600px]">
      <div className="mb-4 flex justify-between">
        <h2>Настройки</h2>
        <button onClick={closeModal} className="">
          <CloseIcon className="h-5 w-5 fill-black/50 hover:fill-black/100" />
        </button>
      </div>
      <UserList users={users} />
    </div>
  );
};
