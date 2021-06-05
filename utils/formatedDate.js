import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

const formatedDate = date => {
  const usedDate = date ? new Date(date) : new Date();

  return format(usedDate, 'yyyy-MM-dd', {
    locale: pt,
  });
};

export default formatedDate;
