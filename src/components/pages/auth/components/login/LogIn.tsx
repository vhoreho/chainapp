import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { Spinner } from "@/components/common";
import { logInAsync } from "@/features";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { RootState } from "@/store";
import { LOADING_STATUS } from "@/types";
import { REQUEST_STATUS } from "@/types/request-status";

type Props = {
  onSignUp: () => void;
};

export const LogIn = ({ onSignUp }: Props) => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const { error, status, userData } = useAppSelector((state: RootState) => state.auth);
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormDisabled) {
      dispatch(logInAsync(formState)).then((data) => {
        if (data.meta.requestStatus === REQUEST_STATUS.FULFILLED) {
          router.push("/home");
        }
      });
    }
  };

  useEffect(() => {
    formState.username && formState.password ? setIsFormDisabled(false) : setIsFormDisabled(true);
  }, [formState, userData]);

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-md flex-col rounded-md bg-white p-6 text-davy-500 shadow-2xl">
      <h1 className="mb-6 text-3xl font-semibold">Авторизация</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите логин"
          value={formState.username}
          onChange={(e) => setFormState((prev) => ({ ...prev, username: e.target.value }))}
          className="mb-6 w-full rounded-md border-2 border-davy-500 bg-transparent px-4 py-3 placeholder:text-davy-500 focus:border-cornflower-500 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Введите пароль"
          value={formState.password}
          onChange={(e) => setFormState((prev) => ({ ...prev, password: e.target.value }))}
          className="mb-6 w-full rounded-md border-2 border-davy-500 bg-transparent px-4 py-3 placeholder:text-davy-500 focus:border-cornflower-500 focus:outline-none"
        />
        <button
          type="submit"
          className={classNames(
            "relative w-full flex justify-center py-3 rounded-md text-platinum-500 ",
            !isFormDisabled && "cursor-pointer bg-cornflower-500/90 hover:bg-cornflower-500/100",
            isFormDisabled && "bg-cornflower-500/50",
          )}
          disabled={isFormDisabled}
        >
          {status === LOADING_STATUS.LOADING ? <Spinner /> : "Войти"}
        </button>
        {error && <p className="mt-2 text-center text-red-500">{error}</p>}
      </form>
      <button className="ml-auto mt-6 text-davy-500/80 hover:text-davy-500/100" onClick={onSignUp}>
        Зарегистрироваться
      </button>
    </div>
  );
};
