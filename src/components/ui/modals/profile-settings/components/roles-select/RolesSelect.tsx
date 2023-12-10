import { Dispatch, FC, Fragment, SetStateAction, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { v4 } from "uuid";
import { USER_ROLE } from "@/types";

type Props = {
  role: USER_ROLE;
  setRole: Dispatch<SetStateAction<USER_ROLE>>;
};

export const RolesSelect: FC<Props> = ({ role, setRole }) => {
  const roles = [USER_ROLE.MINER, USER_ROLE.USER].filter((r) => r !== role);

  return (
    <Menu as="div" className="relative inline-block w-full text-left">
      <Menu.Button className="group inline-flex w-full items-center justify-between gap-x-1.5 rounded-l-md border p-2">
        {role}
        <ChevronDownIcon className="-mr-1 h-5 w-5 text-davy-500" aria-hidden="true" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-davy-500/100 shadow-lg focus:outline-none">
          {roles.map((role) => (
            <div className="py-1" key={v4()}>
              <Menu.Item>
                {({ active }) => (
                  <span
                    onClick={() => setRole(role)}
                    className={classNames(
                      active ? "text-platinum-500 cursor-pointer" : "text-platinum-500",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    {role}
                  </span>
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
