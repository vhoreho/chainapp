import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { useGetProfileQuery } from "@/api/profile";
import { ProfileSettings, SettingsModal } from "@/components/ui";
import { ERROR_STATUS_CODE } from "@/constants/errors";
import { ROUTES } from "@/constants/routes";
import { ADMIN_ROLES } from "@/constants/vars";
import { useAuthContext, useModal } from "@/hooks/context";
import { USER_ROLE } from "@/types";

export const ProfileDropdown = () => {
  const { logout } = useAuthContext();
  const router = useRouter();
  const { data: profile, isLoading } = useGetProfileQuery();
  const { openModal } = useModal();
  const { t } = useTranslation();

  if (isLoading) {
    return <div className="h-6 w-16 animate-pulse rounded-full bg-gray-300"></div>;
  }

  if (!profile) {
    return null;
  }

  // const usersRolesRequests = users.filter((user) => user.isConfirmedUpdateRoleRequest === false);
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="group inline-flex w-full items-center justify-center gap-x-1.5 text-white hover:text-blue-200">
          {profile?.username}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-white" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none">
          {ADMIN_ROLES.includes(profile?.role ?? USER_ROLE.USER) && (
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <span
                    onClick={() => openModal(<SettingsModal />)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 cursor-pointer" : "text-gray-700",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    {t("header.nav.profile.user-management")}
                  </span>
                )}
              </Menu.Item>
            </div>
          )}

          {/* {ADMIN_ROLES.includes(profile?.role ?? ROLES.USER) && (
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      "flex items-center justify-between",
                      active ? "bg-gray-100 text-gray-900 cursor-pointer" : "text-gray-700",
                    )}
                  >
                    <span
                      onClick={() => openModal(<RequestsRole />)}
                      className={classNames("block px-4 py-2 text-sm")}
                    >
                      Запросы роли
                    </span>
                    <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white">
                      {usersRolesRequests.length}
                    </div>
                  </div>
                )}
              </Menu.Item>
            </div>
          )} */}

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <span
                  onClick={() => openModal(<ProfileSettings profile={profile} />)}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900 cursor-pointer" : "text-gray-700",
                    "block px-4 py-2 text-sm",
                  )}
                >
                  {t("header.nav.profile.settings")}
                </span>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={ROUTES.AUTH}
                  onClick={logout}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm",
                  )}
                >
                  {t("header.nav.profile.logout")}
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
