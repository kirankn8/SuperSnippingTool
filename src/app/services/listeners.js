import { takeScreenShot } from '../utils/capture-screenshot';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const listeners = (ipc) => {

    ipc.on('capture-screenshot', () => {
        takeScreenShot();
    })

}

export default () => listeners(ipcRenderer);
