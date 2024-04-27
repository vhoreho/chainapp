import React, { FunctionComponent, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { invalidateUsers, useCreateUserMutation } from "@/api/users";
import { Iconify } from "@/components/common/design-system/iconify/Iconify";
import { ROLES_TID } from "@/constants/tid";
import { useSnackBarContext } from "@/hooks/context";

export const CreateUser: FunctionComponent = () => {
  const [newUsername, setNewUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newUserRole, setNewUserRole] = useState<{
    id: number;
    tid: string;
  }>(ROLES_TID[0]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { mutate, isPending } = useCreateUserMutation();
  const { handleShow } = useSnackBarContext();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleAddUser = async () => {
    mutate(
      {
        username: newUsername,
        password: newPassword,
        role: newUserRole.id,
      },
      {
        onSuccess: () => {
          invalidateUsers();
          setNewUsername("");
          setNewUserRole(ROLES_TID[0]);
          setNewPassword("");
        },
        onError: (error) => {
          handleShow(error.message, "error");
        },
      },
    );
  };

  const handleChangeInput = (
    event: React.SyntheticEvent<Element, Event>,
    value: { id: number; tid: string } | null,
  ) => {
    if (value) {
      setNewUserRole(value);
    } else {
      setNewUserRole(ROLES_TID[0]);
    }
  };
  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h5" gutterBottom>
        Добавить пользователя
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item lg={3}>
          <TextField
            label="Имя пользователя"
            variant="outlined"
            fullWidth
            size="small"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </Grid>
        <Grid item lg={3}>
          <TextField
            label="Пароль"
            variant="outlined"
            fullWidth
            type={showPassword ? "text" : "password"}
            size="small"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} size="small">
                    {showPassword ? (
                      <Iconify icon="streamline:invisible-1" />
                    ) : (
                      <Iconify icon="streamline:visible" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item lg={4}>
          <Autocomplete
            options={ROLES_TID}
            fullWidth
            size="small"
            value={newUserRole}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.tid}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Выберите роль"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
            onChange={handleChangeInput}
            getOptionLabel={(option) => option.tid}
          />
        </Grid>
        <Grid item lg={2}>
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            disabled={!newUsername.length && !newPassword.length}
            onClick={handleAddUser}
          >
            {isPending ? (
              <CircularProgress
                sx={{ width: "20px !important", height: "20px !important" }}
                color="inherit"
              />
            ) : (
              <>Создать</>
            )}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
