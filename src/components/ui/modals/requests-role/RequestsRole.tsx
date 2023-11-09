"use client";

import {
  approveChangeRoleRequest,
  getUsersAsync,
  rejectChangeRoleRequest,
} from "@/features";
import { useModal } from "@/hooks/context";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { RootState } from "@/store";
import classNames from "classnames";
import { useEffect, useState } from "react";
import CloseIcon from "../../icons/Close";

export const RequestsRole = () => {
  const { users } = useAppSelector((state: RootState) => state.users);
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const dispatch = useAppDispatch();
  const { closeModal } = useModal();

  const handleApprove = (id: number) => {
    setIsApproved(true);
    dispatch(approveChangeRoleRequest(id));
  };

  const handleReject = (id: number) => {
    setIsApproved(true);
    dispatch(rejectChangeRoleRequest(id));
  };

  const updateRoleUsersRequest = users.filter(
    (user) => user.isConfirmedUpdateRoleRequest === false
  );

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  return (
    <div className="w-[760px]">
      <div className="flex justify-between mb-4">
        <h2>Запросы на изменение роли</h2>
        <button onClick={closeModal} className="">
          <CloseIcon className="fill-black/50 w-5 h-5 hover:fill-black/100" />
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
          {updateRoleUsersRequest.map((user) => (
            <tr
              key={`update_request_role_${user.id}`}
              className={classNames(
                "border border-slate-300 rounded-lg py-1 px-4"
              )}
            >
              <td className="px-2 border border-slate-300">{user.username}</td>
              <td className="px-2 border border-slate-300">{user.role}</td>
              <td className="flex justify-center">
                {isApproved ? (
                  <span className="text-green-500">Одобрено</span>
                ) : isRejected ? (
                  <span className="text-red-500">Отклонено</span>
                ) : (
                  <div className="flex my-1 justify-center gap-2 text-white">
                    <button
                      className="px-6 py-1 bg-green-500/90 rounded hover:bg-green-500/100"
                      onClick={() => handleApprove(user.id || 0)}
                    >
                      Одобрить
                    </button>
                    <button
                      className="px-6 py-1 bg-red-500/90 rounded hover:bg-red-500/100"
                      onClick={() => handleReject(user.id || 0)}
                    >
                      Отклонить
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
