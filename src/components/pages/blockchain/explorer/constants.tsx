import { BitcoinIcon } from "@/components/common/icons/bitcoin";
import { EthereumIcon } from "@/components/common/icons/ethereum";
import { ROUTES } from "@/constants/routes";
import { Explorer } from "./types";

export const EXPLORERS: Explorer[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    icon: <BitcoinIcon />,
    url: ROUTES.BLOCKCHAIN_EXPLORER.BITCOIN,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    icon: <EthereumIcon />,
    url: ROUTES.BLOCKCHAIN_EXPLORER.ETHERIUM,
  },
];
