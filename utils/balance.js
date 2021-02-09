const data = [];

const balance = data.reduce(
  (accumulator, transaction) => {
    switch (transaction.type) {
      case 'income':
        accumulator.income += Number(transaction.price);
        accumulator.total += Number(transaction.price);
        break;
      case 'outcome':
        accumulator.outcome += Number(transaction.price);
        accumulator.total -= Number(transaction.price);
        break;
      default:
        break;
    }

    return accumulator;
  },
  {
    income: 0,
    outcome: 0,
    total: 0,
  },
);

export default balance;
