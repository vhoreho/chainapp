import { FunctionComponent, useEffect, useState } from "react";
import { updateProfile } from "@/features";
import { useModal } from "@/hooks/context";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { RootState } from "@/store";
import { RolesEnum, User } from "@/types";
import CloseIcon from "../../icons/Close";
import { RolesSelect } from "./components/roles-select/RolesSelect";

type Props = {
  user: User;
};

export const ProfileSettings: FunctionComponent<Props> = ({ user }) => {
  const { authData } = useAppSelector((state: RootState) => state.auth.userData);
  const [formState, setFormState] = useState({
    id: authData.id ?? 0,
    username: authData.username,
    email: authData.email,
    password: "",
  });
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const { closeModal } = useModal();

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      <div className="mb-4 flex justify-between">
        <h2>Настройки профиля</h2>
        <button onClick={closeModal} className="">
          <CloseIcon className="h-5 w-5 fill-black/50 hover:fill-black/100" />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-1 block">Username</label>
          <input
            type="text"
            name="username"
            value={formState.username}
            disabled
            onChange={handleChange}
            className="w-full rounded-md border p-2"
          />
        </div>
        <div className="mb-4">
          <label className="mb-1 block">Email</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            className="w-full rounded-md border p-2"
          />
        </div>
        <div className="mb-4">
          <label className="mb-1 block">Новый пароль</label>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            className="w-full rounded-md border p-2"
          />
        </div>
        {authData.role !== RolesEnum.SUPERADMIN && (
          <div className="mb-4">
            <label className="mb-1 block">Запросить роль</label>
            <RolesSelect />
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-green-500 px-4 py-2 text-white disabled:bg-green-300"
            disabled={isFormDisabled}
          >
            Сохранить изменения
          </button>
        </div>
      </form>
    </div>
  );
};
