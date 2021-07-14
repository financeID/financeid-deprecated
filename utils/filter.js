export const sort = (snapshot, date, filter) => {
  var filterObj = {
    reverse: true,
    fromDate: null,
    toDate: null,
    type: filter.type,
    tag: filter.tag,
  };

  let arr = [];

  console.log(filter);
  snapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;

    arr.push(item);
  });

  if (filterObj.type) {
    arr = arr.filter(item => {
      const type = item.type === filterObj.type;

      return type;
    });
  }

  if (filterObj.tag) {
    arr = arr.filter(item => {
      const tag = item.tag === filterObj.tag;

      return tag;
    });
  }

  if (filterObj.reverse === true) {
    const sortByDate = arr => {
      const sorter = (a, b) => {
        return b.created_at - a.created_at;
      };
      arr.sort(sorter);
    };

    sortByDate(arr);
  }

  if (filterObj.fromDate && filterObj.toDate) {
    arr = arr.filter(item => {
      const range =
        new Date(item.date).getTime() >= filterObj.fromDate.getTime() &&
        new Date(item.date).getTime() <= filterObj.toDate.getTime();

      return range;
    });
  } else {
    if (date) {
      return arr.filter(x => {
        const dateSplit = x.date.slice(0, 7);

        return dateSplit === date;
      });
    }
  }

  return arr;
};
