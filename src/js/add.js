const electron = require("electron");
const { remote, ipcRenderer } = electron;

const closeBtn = document.getElementById("close-btn");

closeBtn.addEventListener("click", function(event) {
  var window = remote.getCurrentWindow();
  window.close();
});

const updateBtn = document.getElementById("update-btn");

updateBtn.addEventListener("click", function() {
  const value = document.getElementById("notify-val").value;
  ipcRenderer.send("update-notify-value", value);
  var window = remote.getCurrentWindow();
  window.close();
});
