const path = require("path");
const electron = require("electron");
const axios = require("axios");
const BrowserWindow = electron.remote.BrowserWindow;
const { ipcRenderer } = electron;

const API_URL = "https://min-api.cryptocompare.com";
const notifyBtn = document.getElementById("notify-btn");
const price = document.querySelector("h1");
const targetPrice = document.getElementById("target-price");
let targetPriceVal;

const notification = {
  title: "BTC Alert",
  body: "BTC just beat your target price!",
  icon: path.join(__dirname, "../assets/images/btc.png")
};

function getBTC() {
  axios
    .get(`${API_URL}/data/pricemulti?fsyms=BTC&tsyms=USD`)
    .then(res => {
      const cryptos = res.data.BTC.USD;
      price.innerHTML = "$" + cryptos.toLocaleString("en");

      if (targetPrice.innerHTML != "" && targetPriceVal < cryptos) {
        const myNotification = new window.Notification(
          notification.title,
          notification
        );
      }
    })
    .catch(err => console.log(err));
}

getBTC();
setInterval(getBTC, 30000);

notifyBtn.addEventListener("click", function(event) {
  // Create the browser window.
  let win = new BrowserWindow({
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    width: 400,
    height: 200,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the add.html of the app.
  win.loadFile(path.join(__dirname, "./add.html"));

  // Emitted when the window is closed
  win.on("closed", () => {
    win = null;
  });
});

ipcRenderer.on("targetPriceVal", function(event, arg) {
  targetPriceVal = Number(arg);
  targetPrice.innerHTML = "$" + targetPriceVal.toLocaleString("en");
});
