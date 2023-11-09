"use client";

import { getUsersAsync } from "@/features";
import { useModal } from "@/hooks/context";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { RootState } from "@/store";
import { useEffect } from "react";
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
    <div className="w-[600px] font-play">
      <div className="flex justify-between mb-4">
        <h2>Настройки</h2>
        <button onClick={closeModal} className="">
          <CloseIcon className="fill-black/50 w-5 h-5 hover:fill-black/100" />
        </button>
      </div>
      <UserList users={users} />
    </div>
  );
};
