import { enc, MD5 } from "crypto-js";
import { Block, ROLES } from "@/types";

export const ZERO_BLOCK_IDENTIFIER = "Нулевой блок не имеет предыдущего хэша";

export const ADMIN_ROLES = [ROLES.ADMIN, ROLES.SUPERADMIN];

export const ZERO_BLOCK = new Block(
  {
    id: 0,
    created_date: "Дата создания блока",
    prevHash: "Нулевой блок не имеет предыдущего хэша",
    hash: "7252f2453b7a9cd4703e362cbe7dae48",
    nonce: 0,
    data: JSON.stringify({
      amount: "Указывается количество токенов переданных между кошельками",
      receivedAddress: "Указывается адрес кошелька куда будут отправлены токены",
      message: "В тексте сообщения указывается примечание к транзакции",
    }),
  },
  // "Дата создания блока",
  // {
  //   amount: "Указывается количество токенов переданных между кошельками",
  //   receivedAddress: "Указывается адрес кошелька куда будут отправлены токены",
  //   message: "В тексте сообщения указывается примечание к транзакции",
  // },
  // ZERO_BLOCK_IDENTIFIER,
);

export const DEFAULT_WALLET_ADDRESS = MD5(new Date().getTime().toString()).toString(enc.Base64);
