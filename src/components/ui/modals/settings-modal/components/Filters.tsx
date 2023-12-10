import React, { useState } from "react";
import { USER_ROLE } from "@/types";

interface FiltersProps {
  roles: USER_ROLE[];
  onFilterChange: (selectedRoles: USER_ROLE[]) => void;
  onSearchChange: (searchText: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ roles, onFilterChange, onSearchChange }) => {
  const [selectedRoles, setSelectedRoles] = useState<USER_ROLE[]>([]);
  const [searchText, setSearchText] = useState("");

  const handleRoleChange = (role: USER_ROLE) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleApplyFilters = () => {
    onFilterChange(selectedRoles);
  };

  return (
    <div className="rounded-lg border border-gray-300 p-4 shadow-md">
      <h3 className="mb-2 text-lg font-semibold">Фильтры и поиск</h3>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Поиск по имени"
          value={searchText}
          onChange={handleSearchChange}
          className="grow border p-2"
        />
        <button
          onClick={handleApplyFilters}
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Применить фильтры
        </button>
      </div>
      <div>
        {roles.map((role) => (
          <label key={role} className="mb-2 block">
            <input
              type="checkbox"
              value={role}
              checked={selectedRoles.includes(role)}
              onChange={() => handleRoleChange(role)}
              className="mr-2"
            />
            {role}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filters;
