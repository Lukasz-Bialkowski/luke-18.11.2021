import { INTL_LOCALE } from "../constants/config";

type NumberFormatConfig = {
  minimumFractionDigits?: number;
};

const formatNumber = (number: number, config?: Partial<NumberFormatConfig>) => {
  return new Intl.NumberFormat(INTL_LOCALE, { ...config }).format(number);
};

export { formatNumber };
