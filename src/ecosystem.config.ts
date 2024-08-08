module.exports = {
  apps: [
    {
      name: "server",
      script: "./dist/server.mjs",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "client",
      script: "npx",
      args: "http-server -p 7070 -a 127.0.0.1",
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
