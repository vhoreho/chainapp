import { Stack } from "@mui/material";
import { navConfig } from "../../../constants";
import { NavItem } from "./nav-item";

export const Menu = () => {
  return (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );
};
