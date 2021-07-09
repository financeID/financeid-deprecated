export const sort = (snapshot, date) => {
  var filter = {
    reverse: true,
    fromDate: null,
    toDate: null,
    type: null,
    tag: null,
  };

  let arr = [];

  snapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;

    arr.push(item);
  });

  if (filter.fromDate && filter.toDate) {
    arr = arr.filter(item => {
      const range =
        new Date(item.date).getTime() >= filter.fromDate.getTime() &&
        new Date(item.date).getTime() <= filter.toDate.getTime();

      return range;
    });
  }

  if (filter.type) {
    arr = arr.filter(item => {
      const type = item.type === filter.type;

      return type;
    });
  }

  if (filter.tag) {
    arr = arr.filter(item => {
      const tag = item.tag === filter.tag;

      return tag;
    });
  }

  if (filter.reverse === true) {
    const sortByDate = arr => {
      const sorter = (a, b) => {
        return b.created_at - a.created_at;
      };
      arr.sort(sorter);
    };

    sortByDate(arr);
  }

  if (date) {
    return arr.filter(x => {
      const dateSplit = x.date.slice(0, 7);

      return dateSplit === date;
    });
  }

  return arr;
};
