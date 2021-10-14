const formatValue = value => {
  const number = value.toFixed(2).split('.');
  if (value < 0) {
    number[0] =
      '- R$ ' +
      number[0]
        .split(/(?=(?:...)*$)/)
        .join('.')
        .replace(/[^\d]+/, '');
  } else {
    number[0] =
      'R$ ' +
      number[0]
        .split(/(?=(?:...)*$)/)
        .join('.')
        .replace(/[^\d]+/, '');
  }

  return number.join(',');
};

export default formatValue;
