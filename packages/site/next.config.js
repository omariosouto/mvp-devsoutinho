/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@devsoutinho/cms',
  '@devsoutinho/ui',
]);

module.exports = withPlugins([withTM], {
  future: {
    webpack5: true,
  },
  trailingSlash: true,
  images: {
    domains: ['unavatar.now.sh'],
  },
  async redirects() {
    const redirects = [
      {
        source: '/go/youtube/',
        destination: 'https://youtube.com/DevSoutinho',
        permanent: true,
      },
      {
        source: '/go/comunidade/',
        destination: 'https://discord.gg/SpsBHQJeXb',
        permanent: true,
      },
    ];

    return redirects;
  },
});
