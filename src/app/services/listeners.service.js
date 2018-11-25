const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const config = require('../../config.json')

const keyboardOps = config.keyboardEvents;

const listeners = (ipc) => {

    const captureScreen = keyboardOps.captureScreenshot;
    ipc.on(captureScreen.eventName, () => {
        window.dispatchEvent(new Event('screenClick'));

    });

    const recordScreen = keyboardOps.recordScreen;
    ipc.on(recordScreen.eventName, () => {
        window.dispatchEvent(new Event('screenRecord'));
    });
}

export default () => listeners(ipcRenderer);
