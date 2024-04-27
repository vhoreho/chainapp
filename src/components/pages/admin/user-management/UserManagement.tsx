import { FunctionComponent, useMemo } from "react";
import { Delete, Edit } from "@mui/icons-material";
import {
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useGetProfileQuery } from "@/api/profile";
import { invalidateUsers, useDeleteUserMutation, useGetUsersQuery } from "@/api/users";
import { ROLES_TID } from "@/constants/tid";
import { useSnackBarContext } from "@/hooks/context";
import { CreateUser } from "./components/create-user/CreateUser";

export const UserManagement: FunctionComponent = () => {
  const { data, isLoading } = useGetUsersQuery();
  const { data: profile } = useGetProfileQuery();
  const { mutate: deleteUser, isPending } = useDeleteUserMutation();
  const { handleShow } = useSnackBarContext();

  const users = useMemo(() => {
    return data?.length ? data.filter((d) => d.username !== profile?.username) : [];
  }, [data, profile?.username]);

  const handleDeleteUser = async (userId: number) => {
    await deleteUser(userId, {
      onError: (error) => {
        handleShow(error.message, "error");
      },
    });
    invalidateUsers();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Управление пользователями
      </Typography>
      <CreateUser />
      {isLoading ? (
        <span>loading</span>
      ) : users?.length ? (
        <Paper elevation={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell size="small">Имя пользователя</TableCell>
                  <TableCell size="small">Роль</TableCell>
                  <TableCell size="small">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell size="small">{user.username}</TableCell>
                    <TableCell size="small">
                      {ROLES_TID.find((role) => role.id === user.role)?.tid}
                    </TableCell>
                    <TableCell size="small">
                      <IconButton
                        color="primary"
                        // onClick={() =>
                        //   handleRoleChange(
                        //     user.id,
                        //     user.role === "ADMINISTRATOR" ? "SIMPLE_USER" : "ADMINISTRATOR",
                        //   )
                        // }
                      >
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteUser(user.id)}>
                        {isPending ? (
                          <CircularProgress
                            sx={{ width: "20px !important", height: "20px !important" }}
                            color="inherit"
                          />
                        ) : (
                          <Delete />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : null}
    </Container>
  );
};
