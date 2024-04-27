import { ROUTES } from "@/constants/routes";

export const MENU_OPTIONS = [
  {
    label: "Главная",
    icon: "eva:home-fill",
    path: ROUTES.DASHBOARD,
  },
  // {
  //   label: "Profile",
  //   icon: "eva:person-fill",
  // },
  // {
  //   label: "Settings",
  //   icon: "eva:settings-2-fill",
  // },
];

export const ADMIN_MENU_OPTIONS = [
  {
    label: "Главная",
    icon: "eva:home-fill",
    path: ROUTES.DASHBOARD,
  },
  {
    label: "Пользователи",
    icon: "eva:home-fill",
    path: ROUTES.ADMIN.USER_MANAGEMENT,
  },
  // {
  //   label: "Profile",
  //   icon: "eva:person-fill",
  // },
  // {
  //   label: "Settings",
  //   icon: "eva:settings-2-fill",
  // },
];
