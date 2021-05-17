module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: {
    BACKEND_HOST: "http://127.0.0.1:8000/api",
    STRIPE_PK:
      "pk_test_51Ilb2JH7D1TC3ju0tp1CNG0aQzyK9HhfHRoJjx5Gmj1PVfbVH9syHuIpTdTThxM2si51sh7umiBahtUyPXXAASQP00fZx4gB3A",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
