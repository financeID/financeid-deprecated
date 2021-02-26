const snapshotToArray = (snapshot, date) => {
  var returnArr = [];

  snapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  const filterObj = returnArr.filter((x) => x.date === Number(date));

  console.log(filterObj);

  return filterObj;
};

export default snapshotToArray;
