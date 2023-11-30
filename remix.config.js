/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],

  routes(defineRoutes) {
    return defineRoutes((route) => {
      route("posts", "routes/posts.jsx", () => {
        route("", "routes/posts.index.jsx", { index: true });
      });
    });
  },


  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
};
