import { takeScreenShot } from '../utils/capture-screen';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const config = require('../../config.json')

const keyboardOps = config.keyboardEvents;

const listeners = (ipc) => {

    const captureScreen = keyboardOps.captureScreenshot;
    ipc.on(captureScreen.eventName, () => {
        takeScreenShot();
    })

}

export default () => listeners(ipcRenderer);
