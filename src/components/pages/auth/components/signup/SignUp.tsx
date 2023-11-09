import { FormEvent, useEffect, useState } from "react";
import classNames from "classnames";
import { LOADING_STATUS, SignUp } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { RootState } from "@/store";
import { signUpAsync } from "@/features";
import { Spinner } from "@/components/common";

type Props = {
  onSignIn: () => void;
};

export const SignUpPage = ({ onSignIn }: Props) => {
  const [formState, setFormState] = useState<SignUp>({
    username: "",
    email: "",
    password: "",
  });
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const { error, status, userData } = useAppSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormDisabled) {
      dispatch(signUpAsync(formState));
    }
  };

  useEffect(() => {
    // if (userData.authData.username) navigate('/home');
    formState.email && formState.password && formState.username
      ? setIsFormDisabled(false)
      : setIsFormDisabled(true);
  }, [formState, userData]);

  return (
    <div className="mx-auto flex flex-col max-w-md w-full p-6 bg-platinum-500 text-davy-500 rounded-md relative z-10">
      <h1 className="text-3xl font-semibold mb-6">Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите логин"
          value={formState.username}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, username: e.target.value }))
          }
          className="w-full mb-6 px-4 py-3 bg-platinum-500 border-2 border-davy-500 placeholder:text-davy-500 rounded-md focus:outline-none focus:border-cornflower-500"
        />
        <input
          type="email"
          placeholder="Введите email"
          value={formState.email}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, email: e.target.value }))
          }
          className="w-full mb-6 px-4 py-3 bg-platinum-500 border-2 border-davy-500 placeholder:text-davy-500 rounded-md focus:outline-none focus:border-cornflower-500"
        />
        <input
          type="password"
          placeholder="Введите пароль"
          value={formState.password}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, password: e.target.value }))
          }
          className="w-full mb-6 px-4 py-3 bg-platinum-500 border-2 border-davy-500 placeholder:text-davy-500 rounded-md focus:outline-none focus:border-cornflower-500"
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
          {status === LOADING_STATUS.LOADING ? (
            <Spinner />
          ) : (
            "Зарегистрироваться"
          )}
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </form>
      <button
        className="mt-6 text-davy-500/80 ml-auto hover:text-davy-500/100"
        onClick={onSignIn}
      >
        Войти
      </button>
    </div>
  );
};
