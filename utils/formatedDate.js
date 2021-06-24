import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

export const formatedDate = date => {
  const usedDate = date ? new Date(date) : new Date();

  return format(usedDate, 'dd/MM/yyyy', {
    locale: pt,
  });
};

export const formatedDatePtBR = date => {
  const day = date.slice(0, 2);
  const month = date.slice(3, 5) - 1;
  const year = date.slice(6, 11);

  return format(new Date(year, month, day), 'yyyy-LL-dd', {
    locale: pt,
  });
};
