/* 
    This is the main process of the Electron app
*/
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const globalShortcut = electron.globalShortcut;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        title: 'Super Snipping Tool',
        width: 400,
        height: 230,
        minWidth: 400,
        minHeight: 230,
        show: false,
        frame: true,
        // webPreferences: {
        //     nodeIntegration: false,
        //     preload: __dirname + '/app/utils/preload.js'
        // },
    });

    mainWindow.loadURL(
        process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, '/../build/index.html'),
            protocol: 'file:',
            slashes: true
        })
    );

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // React Debugger
    // Install React Dev Tools
    const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

    installExtension(REACT_DEVELOPER_TOOLS).then((name) => {
        console.log(`Added Extension:  ${name}`);
    }).catch((err) => {
        console.log('An error occurred: ', err);
    });

    // TODO: Fix the global shortcut feature
    globalShortcut.register('Alt+C', function () {
        mainWindow.webContents.send('capture-screenshot');
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});