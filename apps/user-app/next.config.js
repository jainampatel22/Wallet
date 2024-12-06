/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true, // Ensure this is needed for your app.
      esmExternals: "loose", // Handle ESM dependencies.
    },
    webpack(config) {
      config.externals = {
        bcrypt: "commonjs bcrypt", // Fix for Node-specific packages like bcrypt.
      };
      return config;
    },
  };
  
  export default nextConfig;
  