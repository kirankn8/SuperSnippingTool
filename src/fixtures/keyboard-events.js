const electron = require('electron');
const globalShortcut = electron.globalShortcut;
const config = require('../config.json');

const keyboardOps = config.keyboardEvents;

const keyboardEvents = (win) => {

    const captureScreen = keyboardOps.captureScreenshot;
    globalShortcut.register(captureScreen.keyboardShortcut, function () {
        win.webContents.send(captureScreen.eventName);
    });

    const recordScreen = keyboardOps.recordScreen;
    globalShortcut.register(recordScreen.keyboardShortcut, function () {
        win.webContents.send(recordScreen.eventName);
    });

}

module.exports = keyboardEvents;