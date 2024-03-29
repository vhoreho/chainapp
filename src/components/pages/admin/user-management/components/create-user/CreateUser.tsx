import React, { FunctionComponent, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateUserMutation } from "@/api/users";
import { Iconify } from "@/components/common/design-system/iconify/Iconify";
import { ROLES_TID } from "@/constants/tid";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";

type Props = {
  onFetchUser: () => void;
};

export const CreateUser: FunctionComponent<Props> = ({ onFetchUser }) => {
  const [newUsername, setNewUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newUserRole, setNewUserRole] = useState<{
    id: number;
    tid: string;
  }>(ROLES_TID[0]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const createUserMutation = useCreateUserMutation();

  const queryClient = useQueryClient();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleAddUser = async () => {
    try {
      await createUserMutation.mutateAsync({
        username: newUsername,
        password: newPassword,
        role: newUserRole.id,
      });
      queryClient.invalidateQueries({ queryKey: [USE_QUERY_KEYS.USERS.QUERY.GET_USERS] });
      setNewUsername("");
      setNewUserRole(ROLES_TID[0]);
      setNewPassword("");
    } catch (error) {
      console.error("Error adding user:", error);
    }
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
            Создать
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
