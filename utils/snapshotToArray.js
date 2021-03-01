const snapshotToArray = (snapshot, date) => {
  var returnArr = [];

  snapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  const filterObj = returnArr.filter(x => {
    const dateSplit = x.date.toString().split('/0')[1];
    return dateSplit === date;
  });

  return filterObj;
};

export default snapshotToArray;
