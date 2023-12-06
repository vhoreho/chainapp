import { AxiosError } from "axios";

export const getAxiosErrorMessage = (error: any) => {
  if (error instanceof AxiosError) {
    return error.response?.data.message;
  }
};
