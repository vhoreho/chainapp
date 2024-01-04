import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useResponsive } from "@/hooks/use-responsive";
import { Logo } from "../../logo/Logo";
import Scrollbar from "../../scrollbar/Scrollbar";
import navConfig, { ACCOUNT, NAV } from "./constants";
import { NavItem } from "./nav-item";

type Props = {
  openNav: boolean;
  onCloseNav: () => void;
};

export default function Nav({ openNav, onCloseNav }: Props) {
  const pathname = usePathname();

  const upLg = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={ACCOUNT.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{ACCOUNT.displayName}</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {ACCOUNT.role}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderUpgrade = (
    <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
      <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: "relative" }}>
        <Box
          component="img"
          src="/assets/illustrations/illustration_avatar.png"
          sx={{ width: 100, position: "absolute", top: -50 }}
        />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6">Get more?</Typography>

          <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
            From only $69
          </Typography>
        </Box>

        <Button
          href="https://material-ui.com/store/items/minimal-dashboard/"
          target="_blank"
          variant="contained"
          color="inherit"
        >
          Upgrade to Pro
        </Button>
      </Stack>
    </Box>
  );

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
      <Logo sx={{ mt: 3, ml: 4 }} />

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />

      {renderUpgrade}
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
