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

  const result = eachMonthOfInterval({
    start: minDate,
    end: maxDate,
  });

  const wkod = result.map(date => {
    const dateTransformed = format(new Date(date), 'yyyy-MM').toString();

    const monthTransformed = format(new Date(date), 'MMMM', {
      locale: pt,
    }).toString();

    const asdk = {
      label: monthTransformed,
      value: dateTransformed,
    };

    return asdk;
  });

  return wkod;
};

export default usedMonthsToArray;
