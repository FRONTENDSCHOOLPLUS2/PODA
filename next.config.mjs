import withPWAInit from "@ducanh2912/next-pwa"

const withPWA = withPWAInit({
  dest: "public",
})

export default withPWA({
  images: {
    domains: ["api.fesp.shop"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.fesp.shop",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
  // appDir: true,
})
