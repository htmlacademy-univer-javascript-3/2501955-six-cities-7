export const OFFER_REVIEW_DATE_FORMATTER: Intl.DateTimeFormat = new Intl.DateTimeFormat(
  'en-US',
  {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  },
);
