import { useMemo, useState } from "react";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import { alpha, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useGetProfileQuery } from "@/api/profile";
import { ADMIN_ROLES } from "@/constants/vars";
import { useAuthContext } from "@/hooks/context";
import { UserRole } from "@/types";
import { ACCOUNT } from "../../constants";
import { ChangeRoleModal } from "./change-role-modal/ChangeRoleModal";
import { ADMIN_MENU_OPTIONS, MENU_OPTIONS } from "./constants";

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { logout } = useAuthContext();
  const { data: profile } = useGetProfileQuery();
  const isAdminRole = useMemo(
    () => ADMIN_ROLES.includes(profile?.role ?? UserRole.SIMPLE_USER),
    [profile?.role],
  );
  const options = useMemo(() => {
    return isAdminRole ? ADMIN_MENU_OPTIONS : MENU_OPTIONS;
  }, [isAdminRole]);

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) =>
            open
              ? `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`
              : alpha(theme.palette.grey[500], 0.08),
        }}
      >
        <Avatar
          src={ACCOUNT.photoURL}
          alt={ACCOUNT.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {ACCOUNT.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ p: 0, mt: 1, ml: 0.75, width: 200 }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {profile?.username}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {profile?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        {options.map((option) => (
          <LinkStyled key={option.label} href={option.path}>
            <MenuItem onClick={handleClose}>{option.label}</MenuItem>
          </LinkStyled>
        ))}

        <Divider sx={{ borderStyle: "dashed", m: 0 }} />

        {!isAdminRole && (
          <MenuItem
            onClick={() => {
              setModalOpen(true);
              handleClose();
            }}
          >
            Сменить роль
          </MenuItem>
        )}

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={logout}
          sx={{ typography: "body2", color: "error.main", py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
      {isModalOpen && (
        <ChangeRoleModal isModalOpen={isModalOpen} handleClose={() => setModalOpen(false)} />
      )}
    </>
  );
}

const LinkStyled = styled(Link)`
  text-transform: none;
  text-decoration: none;
  color: inherit;

  &:hover {
    color: #12b76a !important;
  }
`;
