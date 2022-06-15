import { PowerShell } from '../node_modules/node-powershell/dist/index';
document.getElementById("installspicetify").onclick = function() {installSpicetify()};
function installSpicetify() {
    PowerShell.$`echo "hello from PowerShell"`;
};