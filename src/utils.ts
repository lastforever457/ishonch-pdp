import dayjs from "dayjs";

export const defaultDateFormat = (date?: string, template?: string) =>
  date ? dayjs(date).format(template || "DD.MM.YYYY") : "";

export const defaultDateTimeFormat = (date?: string, template?: string) =>
  date ? dayjs(date).format(template || "DD.MM.YYYY HH:mm") : "";
