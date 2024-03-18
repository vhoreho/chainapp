import React, { FunctionComponent } from "react";
import { alpha, Avatar, Box, Typography } from "@mui/material";
import { ProfileResM } from "@/api/profile/type";
import { ROLES_TID } from "@/constants/tid";
import { ACCOUNT } from "../../../constants";

type Props = {
  profile: ProfileResM;
};

export const Account: FunctionComponent<Props> = ({ profile }) => {
  return (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 1,
        px: 1.5,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={ACCOUNT.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{profile.username}</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {ROLES_TID.find((role) => role.id === profile.role)?.tid}
        </Typography>
      </Box>
    </Box>
  );
};
