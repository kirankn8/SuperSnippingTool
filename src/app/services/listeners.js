import { takeScreenshot } from './actions';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const config = require('../../config.json')

const keyboardOps = config.keyboardEvents;

const listeners = (ipc, cb) => {

    const captureScreen = keyboardOps.captureScreenshot;
    ipc.on(captureScreen.eventName, () => {
        takeScreenshot();
    });

    const recordScreen = keyboardOps.recordScreen;
    ipc.on(recordScreen.eventName, () => {
        cb();
    });
}

export default (cb) => listeners(ipcRenderer, cb);
