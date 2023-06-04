const {app, BrowserWindow, ipcMain} = require("electron")
const path = require("path")
const {Database} = require("sqlite3")

const db = new Database(":memory:")
db.run("create table if not exists test (a, b, c)")

const createWindow = () => {
    const win = new BrowserWindow({
        // frame: false,
        // fullscreen: true,
        // kiosk: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })
    win.loadFile("src/home.html")
}

app.whenReady().then(() => {
    ipcMain.on("log", (_, arg) => {console.log(arg)})
    ipcMain.on("sql", (_, sql) => {console.log(sql)})

    createWindow()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})