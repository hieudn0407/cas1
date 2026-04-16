module.exports = {
  apps: [
    {
      name: "server",
      script: "server.js"
    },
    {
      name: "bot",
      script: "bot.js",
      autorestart: true,
      watch: false,
      delay: 50000
    },
    {
      name: "chat",
      script: "add_chat.js",
      autorestart: true,
      watch: false,
      delay: 70000
    }
  ]
};