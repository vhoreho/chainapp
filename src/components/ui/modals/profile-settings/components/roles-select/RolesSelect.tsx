import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { RootState } from "@/store";
import { RolesEnum } from "@/types";
import { updateRole } from "@/features";
import { Spinner } from "@/components/common";

export const RolesSelect = () => {
  const userData = useAppSelector((state: RootState) => state.auth.userData);
  const roleState = userData.authData.role;
  const [selectedOption, setSelectedOption] = useState(roleState);
  const options = Object.values(RolesEnum);

  const dispatch = useAppDispatch();

  const handleRoleChange = () => {
    dispatch(
      updateRole({
        id: userData.authData.id!,
        role: selectedOption!,
      })
    );
  };

  console.log(userData);

  return (
    <Listbox
      value={selectedOption}
      disabled={userData.authData.isConfirmedUpdateRoleRequest === false}
      onChange={setSelectedOption}
    >
      <div className="relative mt-1">
        <div className="flex ">
          <Listbox.Button
            className={classNames(
              {
                "bg-slate-100":
                  userData.authData.isConfirmedUpdateRoleRequest === false,
              },
              "capitalize relative w-full cursor-pointer rounded-l-lg bg-white py-2 pl-3 pr-10 text-left border  ",
              "sm:text-sm",
              "focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300"
            )}
          >
            <span className="block truncate">
              {selectedOption?.toLowerCase()}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <button
            type="button"
            onClick={handleRoleChange}
            disabled={userData.authData.isConfirmedUpdateRoleRequest === false}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
          >
            {userData.authData.isConfirmedUpdateRoleRequest === false ? (
              <Spinner />
            ) : (
              "Запросить"
            )}
          </button>
        </div>
        {userData.authData.isConfirmedUpdateRoleRequest === false && (
          <span className="text-sm font-play italic">
            После запроса новой роли необходимо подождать пока заявку одобрит
            администратор
          </span>
        )}
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((role, roleIdx) => (
              <Listbox.Option
                key={roleIdx}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 capitalize ${
                    role === roleState
                      ? "bg-green-100 text-green-600"
                      : "text-gray-900"
                  }`
                }
                value={role}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate capitalize ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {role.toLowerCase()}
                    </span>
                    {role === roleState ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
