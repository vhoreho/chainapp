"use client";

import { FunctionComponent, useEffect, useState } from "react";
import { RolesSelect } from "./components/roles-select/RolesSelect";
import { RolesEnum, User } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { RootState } from "@/store";
import { useModal } from "@/hooks/context";
import { updateProfile } from "@/features";
import CloseIcon from "../../icons/Close";

type Props = {
  user: User;
};

export const ProfileSettings: FunctionComponent<Props> = ({ user }) => {
  const { authData } = useAppSelector(
    (state: RootState) => state.auth.userData
  );
  const [formState, setFormState] = useState({
    id: authData.id ?? 0,
    username: authData.username,
    email: authData.email,
    password: "",
  });
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const { closeModal } = useModal();

  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateProfile(formState));
    closeModal();
  };

  useEffect(() => {
    formState.username && formState.password && formState.email
      ? setIsFormDisabled(false)
      : setIsFormDisabled(true);
  }, [formState]);

  return (
    <div className="w-[760px]">
      <div className="flex justify-between mb-4">
        <h2>Настройки профиля</h2>
        <button onClick={closeModal} className="">
          <CloseIcon className="fill-black/50 w-5 h-5 hover:fill-black/100" />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formState.username}
            disabled
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Новый пароль</label>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        {authData.role !== RolesEnum.SUPERADMIN && (
          <div className="mb-4">
            <label className="block mb-1">Запросить роль</label>
            <RolesSelect />
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md disabled:bg-green-300"
            disabled={isFormDisabled}
          >
            Сохранить изменения
          </button>
        </div>
      </form>
    </div>
  );
};
