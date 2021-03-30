const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
    '@devsoutinho/cms',
    '@devsoutinho/ui'
]);

module.exports = withPlugins([withTM], {
    trailingSlash: true,
    future: {
        webpack5: false,
    },
});