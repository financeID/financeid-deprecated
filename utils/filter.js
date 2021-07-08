export const sort = snapshot => {
  var returnArr = [];

  snapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr.slice().sort((a, b) => b.created_at - a.created_at);
};
