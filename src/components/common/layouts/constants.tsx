import { faker } from "@faker-js/faker";
import { set, sub } from "date-fns";
import { SvgColor } from "..";

export const HEADER = {
  H_MOBILE: 64,
  H_DESKTOP: 80,
  H_DESKTOP_OFFSET: 80 - 16,
};

export const NAV = {
  WIDTH: 280,
};

export const SPACING = 8;

export const ACCOUNT = {
  displayName: "Jaydon Frankie",
  email: "demo@minimals.cc",
  photoURL: "/assets/images/avatars/avatar_25.jpg",
  role: "Admin",
};

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

export const navConfig = [
  {
    title: "Блокчейн",
    icon: icon("ic_blockchain"),
    submenu: [
      { title: "Главная", path: "/blockchain/dashboard", icon: icon("ic_analytics") },
      { title: "Эмулятор", path: "/blockchain/emulator", icon: icon("ic_emulator") },
      { title: "Обозреватель", path: "/blockchain/explorer", icon: icon("ic_explorer") },
      {
        title: "Полезности",
        path: "/blockchain/utilities",
        icon: icon("utilities-terminal-svgrepo-com"),
      },
    ],
  },
];

export const NOTIFICATIONS = [
  {
    id: faker.string.uuid(),
    title: "Your order is placed",
    description: "waiting for shipping",
    avatar: null,
    type: "order_placed",
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.string.uuid(),
    title: faker.person.fullName(),
    description: "answered to your comment on the Minimal",
    avatar: "/assets/images/avatars/avatar_2.jpg",
    type: "friend_interactive",
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.string.uuid(),
    title: "You have new message",
    description: "5 unread messages",
    avatar: null,
    type: "chat_message",
    createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.string.uuid(),
    title: "You have new mail",
    description: "sent from Guido Padberg",
    avatar: null,
    type: "mail",
    createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.string.uuid(),
    title: "Delivery processing",
    description: "Your order is being shipped",
    avatar: null,
    type: "order_shipped",
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
];
