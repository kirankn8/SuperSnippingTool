/* 
    This is the main process of the Electron app
*/
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const config = require('../src/config.json');
const keyboardEvents = require('../src/fixtures/keyboard-events');
const menubar = require('../src/fixtures/menubar');

let win;

function createWindow() {
    win = new BrowserWindow({
        title: config.title,
        width: config.width,
        height: config.height,
        minWidth: config.minWidth,
        minHeight: config.minHeight,
        show: config.show,
        backgroundColor: config.backgroundColor,
        frame: config.frame,
    });

    win.loadURL(
        process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, '/../build/index.html'),
            protocol: 'file:',
            slashes: true
        })
    );

    win.once('ready-to-show', () => {
        win.show();
    });

    win.on('closed', () => {
        win = null;
    });

    keyboardEvents(win);
    menubar(win);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});