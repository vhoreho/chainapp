import { FormEvent, useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import classNames from "classnames";
import { Spinner } from "@/components/common";
import { LOADING_STATUS } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { RootState } from "@/store";
import { logInAsync } from "@/features";

type Props = {
  onSignUp: () => void;
};

export const LogIn = ({ onSignUp }: Props) => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const { error, status, userData } = useAppSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormDisabled) {
      dispatch(logInAsync(formState)).then((data) => {
        console.log(data);
      });
    }
  };

  useEffect(() => {
    // if (userData.authData.username) {
    //   navigate("/home");
    // }

    formState.username && formState.password
      ? setIsFormDisabled(false)
      : setIsFormDisabled(true);
  }, [formState, userData]);

  return (
    <div className="mx-auto flex flex-col max-w-md w-full p-6 rounded-md relative z-10 bg-white text-davy-500 shadow-2xl">
      <h1 className="text-3xl font-semibold mb-6">Авторизация</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите логин"
          value={formState.username}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, username: e.target.value }))
          }
          className="w-full mb-6 px-4 py-3 bg-transparent border-2 border-davy-500 placeholder:text-davy-500 rounded-md focus:outline-none focus:border-cornflower-500"
        />
        <input
          type="password"
          placeholder="Введите пароль"
          value={formState.password}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, password: e.target.value }))
          }
          className="w-full mb-6 px-4 py-3 bg-transparent border-2 border-davy-500 placeholder:text-davy-500 rounded-md focus:outline-none focus:border-cornflower-500"
        />
        <button
          type="submit"
          className={classNames(
            "relative w-full flex justify-center py-3 rounded-md text-platinum-500 ",
            !isFormDisabled &&
              "cursor-pointer bg-cornflower-500/90 hover:bg-cornflower-500/100",
            isFormDisabled && "bg-cornflower-500/50"
          )}
          disabled={isFormDisabled}
        >
          {status === LOADING_STATUS.LOADING ? <Spinner /> : "Войти"}
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </form>
      <button
        className="mt-6 text-davy-500/80 ml-auto hover:text-davy-500/100"
        onClick={onSignUp}
      >
        Зарегистрироваться
      </button>
    </div>
  );
};
