const GA_TRACKING_ID = 'UA-193720108-1';
const global = globalThis as any;
global.dataLayer = global.dataLayer || [];
global.gtag = gtag;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function gtag(...args: any): void {
  global.dataLayer.push(...args);
}

const pageview = (url: string): void => {
  global.gtag({
    event: 'pageview',
    url,
  });
};

export default {
  pageview,
  GA_TRACKING_ID,
};
