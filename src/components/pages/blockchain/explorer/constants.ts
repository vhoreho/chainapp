import { ROUTES } from "@/constants/routes";
import { Explorer } from "./types";

export const EXPLORERS: Explorer[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    icon: "https://static.coinstats.app/coins/1650455588819.png",
    url: ROUTES.BLOCKCHAIN_EXPLORER.BITCOIN,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    icon: "https://static.coinstats.app/coins/1650455629727.png",
    url: ROUTES.BLOCKCHAIN_EXPLORER.ETHERIUM,
  },
];
