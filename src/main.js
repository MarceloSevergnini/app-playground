const electron = require('electron');

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let win;

function createWindow() {

    //const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

    var screen = electron.screen;

    var mainScreen = screen.getPrimaryDisplay();
    var dimensions = mainScreen.size;

    console.log("Screen Size -> " + dimensions.width + "x" + dimensions.height);

    win = new BrowserWindow({width : dimensions.width , height : dimensions.height, darkTheme : true, titleBarStyle : "hidden"});

    win.setMaximizable(true);

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.webContents.openDevTools();

    win.on('closed', function () {
        win = null;
    })
}

app.on('ready', createWindow);

electron.app.on('browser-window-created',function(e,window) {
    window.setMenu(null);
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
})

