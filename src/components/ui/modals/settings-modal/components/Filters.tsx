import { RolesEnum } from "@/types";
import React, { useState } from "react";

interface FiltersProps {
  roles: RolesEnum[];
  onFilterChange: (selectedRoles: RolesEnum[]) => void;
  onSearchChange: (searchText: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  roles,
  onFilterChange,
  onSearchChange,
}) => {
  const [selectedRoles, setSelectedRoles] = useState<RolesEnum[]>([]);
  const [searchText, setSearchText] = useState("");

  const handleRoleChange = (role: RolesEnum) => {
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
    <div className="p-4 border border-gray-300 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Фильтры и поиск</h3>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Поиск по имени"
          value={searchText}
          onChange={handleSearchChange}
          className="border p-2 flex-grow"
        />
        <button
          onClick={handleApplyFilters}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Применить фильтры
        </button>
      </div>
      <div>
        {roles.map((role) => (
          <label key={role} className="block mb-2">
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
