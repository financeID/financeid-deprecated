import { min, max, eachMonthOfInterval, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

var usedMonthsToArray = function (snapshot) {
  var returnArr = [];

  snapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  const filterObj = returnArr.map(x => {
    const date = new Date(x.date);

    return date;
  });

  const minDate = min(filterObj);
  const maxDate = max(filterObj);

  const consultMinDate = minDate === isNaN ? minDate : new Date();
  const consultMaxDate = maxDate === isNaN ? maxDate : new Date();

  const result = eachMonthOfInterval({
    start: consultMinDate,
    end: consultMaxDate,
  });

  const transformDate = result.map(date => {
    const dateTransformed = format(new Date(date), 'yyyy-MM').toString();
    const monthTransformed = format(new Date(date), 'MMMM', {
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
