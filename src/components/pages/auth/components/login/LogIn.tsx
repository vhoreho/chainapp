import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import classNames from "classnames";
import { Spinner } from "@/components/common";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher/LanguageSwitcher";
import { ROUTES } from "@/constants/routes";
import { useAuthContext } from "@/hooks/context";
import { REQUEST_STATUS } from "@/types";

type Props = {
  onSignUp: () => void;
};

export const LogIn = ({ onSignUp }: Props) => {
  const { t } = useTranslation();

  const [formState, setFormState] = useState({ username: "", password: "" });
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const { isLoading, logIn, error } = useAuthContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormDisabled) {
      logIn(formState);
    }
  };

  useEffect(() => {
    formState.username && formState.password ? setIsFormDisabled(false) : setIsFormDisabled(true);
  }, [formState]);

  return (
    <div className="relative z-10 mx-4 flex w-full max-w-md flex-col rounded-md bg-white p-6 text-davy-500 shadow-2xl">
      <h1 className="mb-6 text-3xl font-semibold">{t("authorization.login.title")}</h1>
      <LanguageSwitcher
        buttonClassnames="!text-davy-500 uppercase"
        menuClassnames="!absolute !top-6 !right-6"
        itemsClassnames="w-fit"
        itemClassnames="cursor-pointer hover:bg-platinum-500 uppercase"
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t("authorization.login.placeholders.username")}
          value={formState.username}
          onChange={(e) => setFormState((prev) => ({ ...prev, username: e.target.value }))}
          className="mb-6 w-full rounded-md border-2 border-davy-500 bg-transparent px-4 py-3 placeholder:text-davy-500 focus:border-cornflower-500 focus:outline-none"
        />
        <input
          type="password"
          placeholder={t("authorization.login.placeholders.password")}
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
          {isLoading ? <Spinner size="xs" /> : t("authorization.login.login")}
        </button>
        {error && <p className="mt-2 text-center text-red-500">{t(error)}</p>}
      </form>
      <button className="ml-auto mt-6 text-davy-500/80 hover:text-davy-500/100" onClick={onSignUp}>
        {t("authorization.login.register")}
      </button>
    </div>
  );
};
