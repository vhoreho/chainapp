import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { alpha, Box, Collapse, List, ListItemButton } from "@mui/material";
import { Iconify } from "@/components/common/design-system/iconify/Iconify";

type Item = {
  title: string;
  path?: string;
  icon: JSX.Element;
};

type Props = { item: Item & { submenu?: Item[] } };

export const NavItem = ({ item }: Props) => {
  const pathname = usePathname();

  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    if (item.submenu) {
      setOpen(!open);
    }
  };

  const active = !item.submenu
    ? item.path === pathname
    : item.submenu.some((i) => i.path === pathname);

  return (
    <React.Fragment>
      <ListItemButton
        component={!item.submenu ? Link : "div"}
        href={item.path}
        onClick={handleToggle}
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: 40,
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
          typography: "body2",
          color: "text.secondary",
          textTransform: "capitalize",
          fontWeight: "fontWeightMedium",
          ...(active && {
            color: (theme) => theme.palette.primary.main,
            fontWeight: "fontWeightSemiBold",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
            },
          }),
        }}
      >
        <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
          {item.icon}
        </Box>

        <Box component="span">{item.title} </Box>

        {item.submenu && (
          <Box
            sx={{
              marginLeft: "auto",
              display: "flex",
            }}
          >
            {open ? (
              <Iconify icon="mdi-light:chevron-up" />
            ) : (
              <Iconify icon="mdi-light:chevron-down" />
            )}
          </Box>
        )}
      </ListItemButton>
      {item.submenu && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.submenu.map((i) => (
              <ListItemButton
                key={`submenu_link_${i.title}`}
                component={Link}
                href={i.path!}
                sx={{
                  pl: 4,
                  typography: "body2",
                  color: "text.secondary",
                  textTransform: "capitalize",
                  fontWeight: "fontWeightMedium",
                  ...(pathname === i.path && {
                    color: (theme) => theme.palette.primary.main,
                    fontWeight: "fontWeightSemiBold",
                  }),
                }}
              >
                <Box component="span" sx={{ width: 18, height: 24, mr: 2 }}>
                  {i.icon}
                </Box>

                <Box component="span">{i.title} </Box>
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </React.Fragment>
  );
};
