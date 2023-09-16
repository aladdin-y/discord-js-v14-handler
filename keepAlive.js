const express = require("express")

const server = express()
const http = require("http")
const chalk = require('chalk')

server.all("/", (req, res) => {
  res.send("Bot is running!")
})



function keepAlive() {
  server.listen(3000, () => {
    console.log(chalk.blue("your bot is Alive."))
  })
}


module.exports = keepAlive