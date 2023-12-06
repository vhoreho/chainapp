import { FunctionComponent, useEffect, useState } from "react";
import classNames from "classnames";
import { useGetProfileQuery } from "@/api/profile";
import { ProfileResM } from "@/api/profile/type";
import { useAuthContext, useModal } from "@/hooks/context";
import { ROLES, UserResM } from "@/types";
import CloseIcon from "../../icons/Close";
import { RolesSelect } from "./components/roles-select/RolesSelect";

type Props = {
  profile: ProfileResM;
};

export const ProfileSettings: FunctionComponent<Props> = ({ profile }) => {
  const [formState, setFormState] = useState({
    id: profile.id,
    username: profile.username,
    email: profile.email,
    password: "",
  });
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [currentRole, setCurrentRole] = useState(profile.role);
  const { closeModal } = useModal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch(updateProfile(formState));
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
        {profile.publicKey && (
          <div className="mb-4">
            <label className="mb-1 block">Public key</label>
            <input
              type="text"
              name="username"
              value={profile.publicKey}
              disabled
              className="w-full truncate rounded-md border p-2"
            />
          </div>
        )}
        {profile.role !== ROLES.ADMIN && profile.role !== ROLES.SUPERADMIN && (
          <div className="mb-4">
            <label className="mb-1 block">Запросить новую роль</label>
            <div className="flex  ">
              <RolesSelect setRole={setCurrentRole} role={currentRole} />
              <button
                className={classNames(
                  "bg-green-400 p-2 text-white rounded-r-md transition-all",
                  "hover:bg-green-500",
                )}
              >
                Запросить
              </button>
            </div>
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
