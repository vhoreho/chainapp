import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { useModal } from "../../../../../hooks/context";
import { SettingsModal } from "../../../../ui/modals/settings-modal/SettingsModal";
import { ProfileSettings } from "../../../../ui/modals/profile-settings/ProfileSettings";
import { RolesEnum } from "../../../../../types/Roles";
import { ADMIN_ROLES } from "../../../../../constants/vars";
import { RequestsRole } from "../../../../ui/modals/requests-role/RequestsRole";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { RootState } from "@/store";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { logout } from "@/features";

export const ProfileDropdown = () => {
  const {
    auth: { userData },
    users: { users },
  } = useAppSelector((state: RootState) => state);
  const { openModal } = useModal();
  const dispatch = useAppDispatch();

  const usersRolesRequests = users.filter(
    (user) => user.isConfirmedUpdateRoleRequest === false
  );

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="group inline-flex items-center w-full justify-center gap-x-1.5 text-white hover:text-blue-200">
          {userData.authData.username}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-white"
            aria-hidden="true"
          />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {ADMIN_ROLES.includes(userData.authData.role ?? RolesEnum.USER) && (
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <span
                    onClick={() => openModal(<SettingsModal />)}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 cursor-pointer"
                        : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Настройки
                  </span>
                )}
              </Menu.Item>
            </div>
          )}

          {ADMIN_ROLES.includes(userData.authData.role ?? RolesEnum.USER) && (
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      "flex items-center justify-between",
                      active
                        ? "bg-gray-100 text-gray-900 cursor-pointer"
                        : "text-gray-700"
                    )}
                  >
                    <span
                      onClick={() => openModal(<RequestsRole />)}
                      className={classNames("block px-4 py-2 text-sm")}
                    >
                      Запросы роли
                    </span>
                    <div className="mr-2 bg-red-500 w-5 h-5 flex items-center justify-center rounded-full text-white">
                      {usersRolesRequests.length}
                    </div>
                  </div>
                )}
              </Menu.Item>
            </div>
          )}

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <span
                  onClick={() =>
                    openModal(<ProfileSettings user={userData.authData} />)
                  }
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 cursor-pointer"
                      : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Настройки профиля
                </span>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={ROUTES.AUTH}
                  onClick={() => dispatch(logout())}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Выйти
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
