const GA_TRACKING_ID = 'UA-193720108-1'; // This is your GA Tracking ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
const pageview = (url: string): void => {
  (window as any).ga('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const event = ({ action, category, label, value }) => {
  (window as any).ga('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export default {
  pageview,
  event,
  GA_TRACKING_ID,
};
