import { takeScreenShot } from '../utils/capture-screenshot';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

ipcRenderer.on('capture-screenshot', function () {
    takeScreenShot();
});

