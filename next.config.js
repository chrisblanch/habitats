module.exports = {
    async rewrites() {
      return [
        {
          source: '/',
          destination: '/region/[region]',
        },
      ]
    },
  }