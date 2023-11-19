// components/LanguageSwitcher.js
import { Fragment } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { v4 } from "uuid";

type Props = {
  buttonClassnames?: string;
  itemsClassnames?: string;
  itemClassnames?: string;
  menuClassnames?: string;
};

const LanguageSwitcher = ({
  buttonClassnames,
  itemClassnames,
  itemsClassnames,
  menuClassnames,
}: Props) => {
  const {
    i18n: { language: currentLanguage, changeLanguage },
  } = useTranslation();
  const router = useRouter();
  const locales = router.locales ?? [currentLanguage];
  const { pathname, query } = router;

  function switchLanguage(locale: string) {
    changeLanguage(locale);
    router.push({ pathname, query }, router.asPath, {
      locale,
      scroll: false,
    });
  }

  return (
    <Menu as="div" className={classNames(menuClassnames, "relative inline-block text-left")}>
      <div>
        <Menu.Button
          className={classNames(
            "group inline-flex w-full items-center justify-center gap-x-1.5 text-white hover:text-platinum-500",
            buttonClassnames,
          )}
        >
          {currentLanguage}
          <ChevronDownIcon
            className={classNames("-mr-1 h-5 w-5 text-white", buttonClassnames)}
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100 transform origin-top"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75 transform origin-top"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={classNames(
            "absolute right-0 z-10 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg  focus:outline-none",
            itemsClassnames,
          )}
        >
          {locales.map((locale) => (
            <Menu.Item key={v4()}>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm",
                    itemClassnames,
                  )}
                  onClick={() => switchLanguage(locale)}
                >
                  {locale}
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LanguageSwitcher;
