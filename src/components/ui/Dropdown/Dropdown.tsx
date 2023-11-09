import { FC, useRef, useState } from "react";
import { DropdownIcon } from "../icons";
import { useOutsideClick } from "@/hooks";
import Link from "next/link";
import { randomUUID } from "crypto";

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
        className="inline-flex items-center justify-center w-full font-medium text-white group hover:text-blue-200"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={toggleDropdown}
      >
        {toggleTitle}
        <DropdownIcon className="w-5 fill-white ml-1 group-hover:fill-blue-200" />
      </button>

      {isDropdownOpen && (
        <div
          className="origin-top-right absolute z-50 right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-scale"
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
