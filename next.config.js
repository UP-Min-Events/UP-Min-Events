// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'api.qrserver.com',
//         port: '',
//         pathname: '/v1/create-qr-code/',
//       },
//       {
//         protocol: 'https',
//         hostname: 'lh3.googleusercontent.com',
//         port: '',
//         pathname: 'a/**',
//       }
//     ],
//     domains: ['lh3.googleusercontent.com', 'api.qrserver.com']
//   },
//   reactStrictMode: true,

//   swcMinify: true,

//   compiler: {

//     removeConsole: process.env.NODE_ENV !== "development",

//   },

// }

// module.exports = nextConfig


// const withPWA = require("next-pwa")({

//   dest: "public",

//   disable: process.env.NODE_ENV === "development",

//   register: true,

// });



// module.exports = withPWA(nextConfig);

// New Additions ====================
// const withPWA = require('next-pwa');
// const runtimeCaching = require('next-pwa/cache.js');
// const isProduction = process.env.NODE_ENV === 'production';

// const config = {
//   experimental: {
//     appDir: true,
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'api.qrserver.com',
//         port: '',
//         pathname: '/v1/create-qr-code/',
//       },
//       {
//         protocol: 'https',
//         hostname: 'lh3.googleusercontent.com',
//         port: '',
//         pathname: 'a/**',
//       },
//     ],
//     domains: ['lh3.googleusercontent.com', 'api.qrserver.com'],
//   },
// };

// const nextConfig = withPWA({
//   dest: 'public',
//   disable: !isProduction,
//   runtimeCaching,
// })(config);

// module.exports = nextConfig;


//Remove if statement when done

if (process.env.NODE_ENV !== 'development') {
  const path = require("path");
  const withPWAInit = require("next-pwa");

  /** @type {import('next-pwa').PWAConfig} */
  const withPWA = withPWAInit({
    dest: "public",
    disable: process.env.NODE_ENV === 'development',
    // Solution: https://github.com/shadowwalker/next-pwa/issues/424#issuecomment-1399683017
    buildExcludes: ["app-build-manifest.json"],
  });

  const generateAppDirEntry = (entry) => {
    const packagePath = require.resolve('next-pwa');
    const packageDirectory = path.dirname(packagePath);
    const registerJs = path.join(packageDirectory, "register.js");

    return entry().then((entries) => {
      // Register SW on App directory, solution: https://github.com/shadowwalker/next-pwa/pull/427
      if (entries["main-app"] && !entries["main-app"].includes(registerJs)) {
        if (Array.isArray(entries["main-app"])) {
          entries["main-app"].unshift(registerJs);
        } else if (typeof entries["main-app"] === "string") {
          entries["main-app"] = [registerJs, entries["main-app"]];
        }
      }
      return entries;
    });
  };

  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
      const entry = generateAppDirEntry(config.entry);
      config.entry = () => entry;

      return config;
    },
  };
  module.exports = withPWA(nextConfig);
}

