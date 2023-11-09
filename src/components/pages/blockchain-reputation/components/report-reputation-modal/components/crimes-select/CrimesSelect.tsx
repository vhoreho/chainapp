import { ChangeEvent, Fragment, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { useOutsideClick } from "@/hooks";

interface CrimeTypeSelectProps {
  options: string[];
  selectedOption: string;
  onSelect: (selected: string) => void;
  className?: string;
  dropdownClassName?: string;
  wrapperClassName?: string;
}

export const CrimeTypeSelect: React.FC<CrimeTypeSelectProps> = ({
  options,
  selectedOption,
  onSelect,
  className,
  dropdownClassName,
  wrapperClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useOutsideClick(selectRef, () => setIsOpen(false));

  return (
    <Menu
      as="div"
      className={classNames("relative inline-block text-left w-full", wrapperClassName)}
    >
      <Menu.Button
        as="div"
        onClick={toggleDropdown}
        className={classNames(
          "group inline-flex items-center justify-between w-full gap-x-1.5 text-black cursor-pointer border py-1 px-3 rounded-md",
          isOpen && "outline outline-blue-600 outline-2",
          className,
        )}
      >
        {selectedOption}
        <ChevronDownIcon className="-mr-1 h-5 w-5 text-black" aria-hidden="true" />
      </Menu.Button>

      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          ref={selectRef}
          className={classNames(
            "absolute right-0 z-10 mt-2 w-full h-96 overflow-auto scrollbar-hide origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            dropdownClassName,
          )}
        >
          {options.map((option) => (
            <div className="py-1" key={option}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(option);
                      toggleDropdown();
                    }}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-1 text-sm w-full text-left",
                    )}
                  >
                    {option}
                  </button>
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
