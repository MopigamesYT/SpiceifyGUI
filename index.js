
// Importation des modules
require('electron-reload')(__dirname)
const { app, ipcMain, BrowserWindow } = require("electron");
const path = require("path");

// Variables globales
let mainWindow;

// Création de la fenêtre principale
function createWindow() {
  mainWindow = new BrowserWindow({
    title: "Spicetify GUI - Chargement",
    icon: path.join(__dirname, "/asset/spicetify.png"),
    autoHideMenuBar: true,
    width: 924,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadURL(path.join(__dirname, "src/index.html"));
}

// Quand l'application est chargée, afficher la fenêtre
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Si toutes les fenêtres sont fermées, quitter l'application
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on('dropped-file', (event, arg) => {
  console.log('Dropped File(s):', arg);
  event.returnValue = `Received ${arg.length} paths.`; // Synchronous reply
})