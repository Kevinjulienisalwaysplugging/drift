const nextConfig = {
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: "/storefront.html",
        destination: "/",
        permanent: false
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/storefront.html"
      }
    ];
  }
};

export default nextConfig;
