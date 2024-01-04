import { AUTH_DATA } from "@/constants/ui";

export const setTokenToStorage = (newToken: string) => {
  if (newToken) {
    localStorage.setItem(AUTH_DATA, newToken);
  } else {
    throw new Error("NO TOKEN TO STORE");
  }
};

export const getTokenFromStorage = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(AUTH_DATA);

    console.log("TOKEN FROM STORAGE:", token);

    return token;
  }

  return "";
};

export const removeTokenFromStorage = () => {
  localStorage.removeItem(AUTH_DATA);
};
