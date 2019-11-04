const path = require("path");
const { app, BrowserWindow, Menu, shell, ipcMain } = require("electron");
const handleSquirrelEvent = require('./handle-squirrel-event');

// Keep a global reference of the window object, if you don't the window will
// be closed automatically when the javascript object is garbage collected.
let win;

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent(app)) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile(path.join(__dirname, "./src/index.html"));

  // Open the DevTools.
  // win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, ususally you would store windows
    // in an array if your app support multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  // Define the navbar menu
  const menu = Menu.buildFromTemplate([
    {
      label: "Menu",
      submenu: [
        {
          label: "Adjust Notification value"
        },
        { type: "separator" },
        {
          label: "CointMarketCap",
          click() {
            shell.openExternal("http://coinmarketcap.com");
          }
        },
        {
          label: "Exit",
          click() {
            app.quit();
          }
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to staty active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // doc icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

ipcMain.on("update-notify-value", function(event, arg) {
  win.webContents.send("targetPriceVal", arg);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
