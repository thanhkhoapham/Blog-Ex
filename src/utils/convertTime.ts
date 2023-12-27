import { format, parseISO, isValid } from 'date-fns';
import { vi } from 'date-fns/locale';

export const convertDateTime = (dateTimeString: string): string => {
  const parsedDate = parseISO(dateTimeString);

  if (!isValid(parsedDate)) {
    return dateTimeString; // Trả về nguyên gốc nếu định dạng không đúng
  }

  const formattedDate = format(parsedDate, "EEEE',' dd-MM-yyyy, HH:mm", { locale: vi });
  return formattedDate;
};