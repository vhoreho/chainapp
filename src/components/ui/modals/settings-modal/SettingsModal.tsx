import { useModal } from "@/hooks/context";
import CloseIcon from "../../icons/Close";
import UserList from "./components/UserList";

export const SettingsModal = () => {
  const { closeModal } = useModal();

  return (
    <div className="w-[600px]">
      <div className="mb-4 flex justify-between">
        <h2>Настройки</h2>
        <button onClick={closeModal} className="">
          <CloseIcon className="h-5 w-5 fill-black/50 hover:fill-black/100" />
        </button>
      </div>
      {/* <UserList users={users} /> */}
    </div>
  );
};
