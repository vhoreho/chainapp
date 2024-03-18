import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { alpha } from "@mui/material/styles";
import { useGetProfileQuery } from "@/api/profile";
import { useProgressContext } from "@/hooks/context/useProgressContext";
import { useResponsive } from "@/hooks/use-responsive";
import Scrollbar from "../../scrollbar/Scrollbar";
import { Account } from "../components/common/nav/account";
import { Menu } from "../components/common/nav/menu";
import { NAV } from "../constants";

type Props = {
  openNav: boolean;
  onCloseNav: () => void;
};

export default function Nav({ openNav, onCloseNav }: Props) {
  const pathname = usePathname();
  const { handleStart, handleStop } = useProgressContext();
  const { data: profile, isLoading, isSuccess } = useGetProfileQuery();

  const upLg = useResponsive("up", "lg");

  if (isLoading) {
    handleStart();
  }

  if (isSuccess) {
    handleStop();
  }

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {isLoading ? (
        <Skeleton
          variant="rounded"
          sx={{
            my: 3,
            mx: 2.5,
            height: 60,
            p: 2,
            display: "flex",
            borderRadius: 1.5,
            alignItems: "center",
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
          }}
        />
      ) : profile ? (
        <Account profile={profile} />
      ) : null}

      <Menu />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
