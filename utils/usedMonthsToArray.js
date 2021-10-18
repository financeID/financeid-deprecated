import { min, max, eachMonthOfInterval, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

const usedMonthsToArray = function (snapshot) {
  let returnArr = [];

  snapshot.forEach(function (childSnapshot) {
    let item = childSnapshot.data();
    item.key = childSnapshot.id;

    returnArr.push(item);
  });

  const filterObj = returnArr.map(x => {
    const date = x.date.toDate();

    return date;
  });

  const minDate = min(filterObj);
  const maxDate = max(filterObj);

  const todayMinDate = minDate > new Date() ? new Date() : minDate;
  const minDateNaN =
    isNaN(todayMinDate) !== isNaN() ? todayMinDate : new Date();

  const todayMaxDate = maxDate < new Date() ? new Date() : maxDate;
  const maxDateNaN =
    isNaN(todayMaxDate) !== isNaN() ? todayMaxDate : new Date();

  const result = eachMonthOfInterval({
    start: minDateNaN,
    end: maxDateNaN,
  });

  const transformDate = result.map(date => {
    const dateTransformed = format(new Date(date), 'yyyy-MM').toString();

    const currentYear = format(new Date(), 'yy').toString();
    const currentYearTransformDate = format(new Date(date), 'yy').toString();

    const putYear =
      currentYear === currentYearTransformDate ? 'MMMM' : 'MMMM/yy';

    const monthTransformed = format(new Date(date), putYear, {
      locale: pt,
    }).toString();

    const labelValue = {
      label: monthTransformed,
      value: dateTransformed,
    };

    return labelValue;
  });

  return transformDate;
};

export default usedMonthsToArray;
