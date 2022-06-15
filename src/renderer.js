const util = require('util');
const exec = util.promisify(require('child_process').exec);

const Spicetifyinit = document.getElementById('installspicetify')
Spicetifyinit.addEventListener('click', () => {
installSpicetify()
});

const spicetifyApply1 = document.getElementById('sa')
spicetifyApply1.addEventListener('click', () => {
spicetifyApply()
});

const spicetifyBackupApply1 = document.getElementById('sba')
spicetifyBackupApply1.addEventListener('click', () => {
spicetifyBackupApply()
});

async function spicetifyBackupApply() {
  const { stdout, stderr } = await exec('spicetify backup apply enable-devtool', {'shell':'powershell.exe'});

  if (stderr) {
    console.error(`error: ${stderr}`);
  }
  console.log(`${stdout}`);
  
}

async function spicetifyApply() {
  const { stdout, stderr } = await exec('spicetify upgrade', {'shell':'powershell.exe'});

  if (stderr) {
    console.error(`error: ${stderr}`);
  }
  console.log(`${stdout}`);
  
}

async function installSpicetify() {
  const { stdout, stderr } = await exec('iwr -useb https://raw.githubusercontent.com/spicetify/spicetify-cli/master/install.ps1 | iex', {'shell':'powershell.exe'});

  if (stderr) {
    console.error(`error: ${stderr}`);
  }
  console.log(`${stdout}`);
  installMarketplace()
}

async function installMarketplace() {
  const { stdout, stderr } = await exec('iwr -useb https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/resources/install.ps1 | iex', {'shell':'powershell.exe'});

  if (stderr) {
    console.error(`error: ${stderr}`);
  }
  console.log(`${stdout}`);
  
}

const button = document.getElementById('settings');
button.addEventListener('click', () => {
    createWindow();
});

let settingsWindow;
function createWindow() {
    settingsWindow = new electron.remote.BrowserWindow({
      title: "Spicetify GUI - Chargement",
      icon: join(__dirname, "/asset/spicetify.png"),
      width: 924,
      height: 500,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
    });
  
    settingsWindow.loadURL(join(__dirname, "settingsPage.html"));
  }

  document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

document.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();

    let pathArr = [];
    for (const f of event.dataTransfer.files) {
        // Using the path attribute to get absolute file path
        console.log('File Path of dragged files: ', f.path)
        pathArr.push(f.path); // assemble array for main.js
    }
    console.log(pathArr);
    const ret = ipcRenderer.sendSync('dropped-file', pathArr);
    console.log(ret);
});

