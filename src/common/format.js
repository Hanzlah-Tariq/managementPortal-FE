const Currencies = {
  'en-US': 'USD',
};

const getLanguage = () => {
  // supports en-US only for now
  return 'en-US';
};

const formatNumber = (number, fractions, style) => {
  const language = getLanguage();
  const defaultStyle = style || 'decimal';
  let retValue;
  if (number && fractions) {
    retValue = new Intl.NumberFormat(language, {
      style: defaultStyle,
      currency: Currencies[language],
      minimumFractionDigits: fractions,
    }).format(number);
  } else if (number && !fractions) {
    retValue = new Intl.NumberFormat(language, {
      style: defaultStyle,
      currency: Currencies[language],
    }).format(number);
  } else {
    retValue = new Intl.NumberFormat(language, {
      style: defaultStyle,
      currency: Currencies[language],
      minimumFractionDigits: 2,
    }).format(0);
  }
  return retValue;
};

export default formatNumber;
