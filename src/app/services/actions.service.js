import { takeScreenShot } from '../utils/capture-screen.util';
import { startRecording, stopRecording } from '../utils/record-screen.util';
import { resize } from '../utils/window-resize.util';


export function takeScreenshot() {
    return takeScreenShot();
}

export function startScreenRecordScreen() {
    return startRecording();
}

export function stopScreenRecordScreen() {
    return stopRecording();
}

export function windowResize(w, h) {
    resize(w, h);
}