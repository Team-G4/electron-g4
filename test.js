const { app } = require('electron');

app.on("ready", () => {
    require("./main")
})