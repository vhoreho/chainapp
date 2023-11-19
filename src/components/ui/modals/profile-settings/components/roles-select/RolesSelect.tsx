import { FC, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { v4 } from "uuid";
import { ROLES } from "@/types";
import { listOfRoles } from "./helpers";

type Props = {
  role: ROLES;
};

export const RolesSelect: FC<Props> = ({ role }) => {
  const roles = listOfRoles();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="group inline-flex w-full items-center justify-center gap-x-1.5 text-white hover:text-blue-200">
          {role}
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
          {roles.map((role) => (
            <div className="py-1" key={v4()}>
              <Menu.Item>
                {({ active }) => (
                  <span
                    onClick={() => {}}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 cursor-pointer" : "text-gray-700",
                      "block px-4 py-2 text-sm",
                    )}
                  ></span>
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
