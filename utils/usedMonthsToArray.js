import { eachMonthOfInterval } from 'date-fns';

const usedMonthsToArray = snapshot => {
  var returnArr = [];

  snapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  const filterObj = returnArr.filter(x => {
    const result = eachMonthOfInterval({
      start: new Date(x.date),
      end: new Date(),
    });

    return result;
  });

  return filterObj;
};

export default usedMonthsToArray;
