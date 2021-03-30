/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@devsoutinho/cms',
  '@devsoutinho/ui',
]);

module.exports = withPlugins([withTM], {
  future: {
    webpack5: false,
  },
  trailingSlash: true,
  images: {
    domains: ['unavatar.now.sh'],
  },
});
