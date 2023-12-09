import { useEffect, useState } from "react";
import classNames from "classnames";
import { useModal } from "@/hooks/context";
import CloseIcon from "../../../../icons/Close";

export const RequestsRole = () => {
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const { closeModal } = useModal();

  const handleApprove = (id: number) => {
    setIsApproved(true);
  };

  const handleReject = (id: number) => {
    setIsApproved(true);
  };

  const updateRoleUsersRequest = [];
  // const updateRoleUsersRequest = users.filter(
  //   (user) => user.isConfirmedUpdateRoleRequest === false,
  // );

  return (
    <div className="w-[760px]">
      <div className="mb-4 flex justify-between">
        <h2>Запросы на изменение роли</h2>
        <button onClick={closeModal} className="">
          <CloseIcon className="h-5 w-5 fill-black/50 hover:fill-black/100" />
        </button>
      </div>
      <table className="w-full border-collapse border border-slate-400">
        <thead>
          <tr>
            <th className="border border-slate-300">Имя пользователя</th>
            <th className="border border-slate-300">Запрашиваемая роль</th>
            <th className="border border-slate-300">Действие</th>
          </tr>
        </thead>
        <tbody>
          {/* {updateRoleUsersRequest.map((user) => (
            <tr
              key={`update_request_role_${user.id}`}
              className={classNames("border border-slate-300 rounded-lg py-1 px-4")}
            >
              <td className="border border-slate-300 px-2">{user.username}</td>
              <td className="border border-slate-300 px-2">{user.role}</td>
              <td className="flex justify-center">
                {isApproved ? (
                  <span className="text-green-500">Одобрено</span>
                ) : isRejected ? (
                  <span className="text-red-500">Отклонено</span>
                ) : (
                  <div className="my-1 flex justify-center gap-2 text-white">
                    <button
                      className="rounded bg-green-500/90 px-6 py-1 hover:bg-green-500/100"
                      onClick={() => handleApprove(user.id || 0)}
                    >
                      Одобрить
                    </button>
                    <button
                      className="rounded bg-red-500/90 px-6 py-1 hover:bg-red-500/100"
                      onClick={() => handleReject(user.id || 0)}
                    >
                      Отклонить
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};