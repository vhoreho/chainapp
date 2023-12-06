import { UserResM } from "@/types";
import { UserItem } from "./UserItem";

interface UserListProps {
  users: UserResM[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="my-4 w-full">
      {users.length ? (
        users.map((user) => <UserItem key={user.id} user={user} />)
      ) : (
        <span>Пользователей нет</span>
      )}
    </div>
  );
};

export default UserList;
