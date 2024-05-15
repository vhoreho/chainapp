import React, { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useChangeRoleMutation } from "@/api/users";
import { ROLES_TID } from "@/constants/tid";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { UserRole } from "@/types";

type Props = {
  isModalOpen: boolean;
  handleClose: () => void;
};

export const ChangeRoleModal: FunctionComponent<Props> = ({ isModalOpen, handleClose }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newUserRole, setNewUserRole] = useState<{
    id: number;
    tid: string;
  }>(ROLES_TID[0]);
  const changeRoleMutation = useChangeRoleMutation();
  const queryClient = useQueryClient();

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

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await changeRoleMutation.mutateAsync({ role: newUserRole.id });

      queryClient.invalidateQueries({ queryKey: [USE_QUERY_KEYS.PROFILE.QUERY.GET] });

      handleClose();

      router.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onClose={handleClose}>
      <DialogTitle>Выберите желаемую роль</DialogTitle>
      <DialogContent sx={{ pt: "8px !important" }}>
        <Autocomplete
          options={ROLES_TID.filter((role) => role.id !== UserRole.ADMINISTRATOR)}
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
                autoComplete: "off",
              }}
            />
          )}
          onChange={handleChangeInput}
          getOptionLabel={(option) => option.tid}
          sx={{ fontSize: "12px !important" }}
        />
      </DialogContent>
      <DialogActions>
        <Button size="small" onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button size="small" type="submit" color="primary" onClick={handleSubmit}>
          {isLoading ? (
            <CircularProgress
              sx={{ width: "20px !important", height: "20px !important" }}
              color="inherit"
            />
          ) : (
            <>Сменить</>
          )}
        </Button>
      </DialogActions>
      {error && (
        <Typography paddingBottom={2} textAlign="center" variant="body2" color="error">
          {error}
        </Typography>
      )}
    </Dialog>
  );
};
