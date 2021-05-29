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

  //const sameDate = minDate == maxDate ? new Date() : maxDate;
  //const consultMinDate = isNaN(minDate) === isNaN() ? new Date() : minDate;
  //const consultMaxDate = isNaN(maxDate) === isNaN() ? new Date() : sameDate;

  //const final = isNaN(sameDate) === isNaN() ? new Date() : sameDate;
  //const inicial = consultMinDate > new Date() ? new Date() : consultMinDate;

  //console.log('maxDate:', maxDate);
  //console.log('minDate:', minDate);
  //console.log('sameDate:', sameDate);
  //console.log('consultMinDate', consultMinDate);
  //console.log('consultMaxDate', consultMaxDate);
  //console.log('inicial', inicial);
  //console.log('final', final);

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
