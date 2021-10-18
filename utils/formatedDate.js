import { format, parseISO } from 'date-fns';

export const formatedDate = date => {
  const usedDate = date ? new Date(date) : new Date();

  return format(usedDate, 'dd/MM/yyyy');
};

export const formatedDatePtBR = date => {
  const day = date.slice(0, 2);
  const month = date.slice(3, 5) - 1;
  const year = date.slice(6, 11);

  const formatedDate = format(new Date(year, month, day), 'yyyy-MM-dd');

  const parse = parseISO(formatedDate);

  return parse;
};
