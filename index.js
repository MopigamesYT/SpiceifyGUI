
// Importation des modules
const { app, ipcMain, BrowserWindow } = require("electron");
const path = require("path");

// Variables globales
let mainWindow;

//test
ipcMain.on('start', (event, data) => {   
  function Process() {
    const process = require('child_process');   
    var ls = process.spawn('script.bat');
    ls.stdout.on('data', function (data) {
      console.log(data);
    });
    ls.stderr.on('data', function (data) {
      console.log(data);
    });
    ls.on('close', function (code) {
       if (code == 0)
            console.log('Stop');
       else
            console.log('Start');
    });
};

Process();
});

// Création de la fenêtre principale
function createWindow() {
  mainWindow = new BrowserWindow({
    title: "Spicetify GUI - Chargement",
    icon: path.join(__dirname, "/asset/spicetify.png"),
    width: 924,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      sandbox: true
    },
  });

  mainWindow.loadURL(path.join(__dirname, "index.html"));
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


