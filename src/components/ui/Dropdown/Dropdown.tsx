import { FC, useRef, useState } from "react";
import Link from "next/link";
import { randomUUID } from "crypto";
import { useOutsideClick } from "@/hooks";
import { DropdownIcon } from "../icons";

type Option = {
  title: string;
  route: string;
};

type Props = {
  toggleTitle: string;
  options: Option[];
};

export const Dropdown: FC<Props> = ({ options, toggleTitle }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        type="button"
        className="group inline-flex w-full items-center justify-center font-medium text-white hover:text-blue-200"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={toggleDropdown}
      >
        {toggleTitle}
        <DropdownIcon className="ml-1 w-5 fill-white group-hover:fill-blue-200" />
      </button>

      {isDropdownOpen && (
        <div
          className="absolute right-0 z-50 mt-2 origin-top-right animate-scale rounded-md bg-white shadow-lg"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {options.map((option) => (
              <Link
                key={randomUUID()}
                href={option.route}
                className="block px-4 py-2 text-sm text-gray-500 hover:text-gray-900"
                onClick={toggleDropdown}
              >
                {option.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
