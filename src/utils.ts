import { useTranslation } from "react-i18next";

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = ("" + phone).replace(/\D/g, "");
  if (cleaned.length === 12) {
    return `+998 (${cleaned.slice(3, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10, 12)}`;
  }
  return phone;
};

export const formatStatus = (status: string): string => {
  const { t } = useTranslation();
  switch (status) {
    case "ACTIVE":
      return t("status.active");
    case "STOPPED":
      return t("status.stopped");
    case "ARCHIVED":
      return t("status.archived");
    case "BLOCKED":
      return t("status.blocked");
    case "DEBTOR":
      return t("status.debtor");
    default:
      return status;
  }
};
