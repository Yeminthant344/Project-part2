module.exports = {
  apps : [{
    name   : "pm2-test",
    script : "./index.js",
    watch : ["utils", "public", "index.js"],
  }]
}
