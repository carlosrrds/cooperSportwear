/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'artwalk.vteximg.com.br',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'static.lojanba.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'static.netshoes.com.br',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'imgnike-a.akamaihd.net',
            port: '',
          },
        ],
      },
};

export default nextConfig;
