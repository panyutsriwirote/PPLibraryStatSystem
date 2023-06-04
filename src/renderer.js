const {convert_blob} = window.electronAPI

const camera = document.getElementById("camera")
const start = document.getElementById("start")
const capture = document.getElementById("capture")

const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

start.addEventListener("click", () => {
    navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
        camera.srcObject = stream
        capture.addEventListener("click", () => {
            canvas.width = camera.videoWidth
            canvas.height = camera.videoHeight
            context.drawImage(camera, 0, 0, canvas.width, canvas.height)
            canvas.toBlob((blob) => {
                convert_blob(blob)
            })
        })
    })
})