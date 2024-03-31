import { formatDistanceToNow } from "date-fns";
import dayjs from "dayjs";

export function fToNow(date: string | number | Date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}

export const convertTimestampToDate = (timestamp: number): string => {
  return dayjs.unix(timestamp).format("M/D/YYYY, HH:mm:ss");
};
