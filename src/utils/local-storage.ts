import { AUTH_TOKEN } from "@/constants/ui";

export const setTokenToStorage = (newToken: string) => {
  if (newToken) {
    localStorage.setItem(AUTH_TOKEN, newToken);
  } else {
    throw new Error("NO TOKEN TO STORE");
  }
};

export const getTokenFromStorage = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(AUTH_TOKEN);

    console.log("TOKEN FROM STORAGE:", token);

    return token;
  }

  return "";
};

export const removeTokenFromStorage = () => {
  localStorage.removeItem(AUTH_TOKEN);
};
