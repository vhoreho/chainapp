import { FunctionComponent, useMemo } from "react";
import { Delete, Edit } from "@mui/icons-material";
import {
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
import axios from "axios";
import { useGetProfileQuery } from "@/api/profile";
import { useGetUsersQuery } from "@/api/users";
import { ROLES_TID } from "@/constants/tid";
import { CreateUser } from "./components/create-user/CreateUser";

export const UserManagement: FunctionComponent = () => {
  const { data, isLoading } = useGetUsersQuery();
  const { data: profile } = useGetProfileQuery();

  const users = useMemo(() => {
    return data?.length ? data.filter((d) => d.username !== profile?.username) : [];
  }, [data]);

  const handleRoleChange = async (userId: number, newRole: string) => {
    try {
      await axios.put(`/api/users/${userId}/role`, { role: newRole });
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await axios.delete(`/api/users/${userId}`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Управление пользователями
      </Typography>
      <CreateUser onFetchUser={() => {}} />
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
                        <Delete />
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
