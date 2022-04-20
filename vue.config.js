/* module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
}; */

module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/" + process.env.LANDMARKS + "/"
      : "/",
};
