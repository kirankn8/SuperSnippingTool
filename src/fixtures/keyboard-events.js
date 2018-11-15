const electron = require('electron');
const globalShortcut = electron.globalShortcut;
const config = require('../config.json');

const keyboardOps = config.keyboardEvents;

const keyboardEvents = (win) => {

    const captureScreen = keyboardOps.captureScreenshot;
    globalShortcut.register(captureScreen.keyboardShortcut, function () {
        win.webContents.send(captureScreen.eventName);
    });

}

module.exports = keyboardEvents;