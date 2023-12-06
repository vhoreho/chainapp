import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { ROUTES } from "@/constants/routes";
import { BlockchainDropdown } from "./components/blockchain-dropdown/BlockchainDropdown";
import { ProfileDropdown } from "./components/profile-dropdown/ProfileDropdown";

export const Header = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-cornflower-500">
        <div className="layout flex items-center justify-between py-5">
          <Link href={ROUTES.HOME} className="font-semibold text-white hover:text-platinum-500">
            Blockchain Detective
          </Link>
          <nav className="ml-6 hidden flex-wrap gap-2 md:flex md:gap-4">
            <Link href={ROUTES.HOME} className="text-white hover:text-platinum-500">
              {t("header.nav.main")}
            </Link>
            <BlockchainDropdown />
            <ProfileDropdown />
          </nav>
          <nav className="flex flex-wrap items-center justify-between md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center rounded px-3 py-2 text-platinum-500 hover:text-white"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </nav>
        </div>
      </header>
      <Transition
        show={isOpen}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition duration-200 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div
          className={classNames(
            "md:hidden absolute z-[100] flex flex-col bg-cornflower-500 text-platinum-500 right-0 top-0 p-5",
          )}
        >
          <Link href={ROUTES.HOME} className="text-white hover:text-platinum-500">
            {t("header.nav.main")}
          </Link>
          <BlockchainDropdown />
          <ProfileDropdown />
        </div>
      </Transition>
    </>
  );
};
