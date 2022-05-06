
const ipcRenderer = require("electron").ipcRenderer

const vidIdInput = document.getElementById("new-video-id")
document.getElementById("set-new-video-id").addEventListener("click", function () {
  let value = vidIdInput.value
  document.getElementById("current-video").innerText = value
  ipcRenderer.invoke("set-new-vid-id", value)
  vidIdInput.value = ""
})


const subjectIdInput = document.getElementById("new-subject-id")
document.getElementById("set-new-subject-id").addEventListener("click", function () {
  let value = subjectIdInput.value
  document.getElementById("current-subject").innerText = value
  ipcRenderer.invoke("set-new-subject-id", value)
  subjectIdInput.value = ""
})

document.getElementById("play").addEventListener("click", function () {
  ipcRenderer.invoke("play")
})

document.getElementById("stop").addEventListener("click", function () {
  ipcRenderer.invoke("stop")
})
