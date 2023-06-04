const {contextBridge, ipcRenderer} = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
    convert_blob: async (blob) => {
        const buffer = Buffer.from(await blob.arrayBuffer())
        ipcRenderer.send("log", buffer)
    }
})