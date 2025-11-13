export const RenameFilterActive = (key: string, t: (key: string) => string): string => {
  switch (key) {
    case 'hotel_id':
      return t('HOTEL');
    case 'country_id':
      return t('COUNTRY');
    case 'food':
      return t('FOOD');
    case 'maxPrice':
      return t('MAX');
    case 'minPrice':
      return t('MIN');
    case 'minDateStart':
      return t('MIN_DATE');
    case 'maxDateEnd':
      return t('MAX_DATE');
    case 'minSlots':
      return t('MIN_SLOTS');
    case 'q':
      return t('TEXT');
    case 'filterByPriceMax':
      return t('FILTER_MAX');
    case 'filterByPriceMin':
      return t('FILTER_MIN');

    default:
      return key;
  }
};
