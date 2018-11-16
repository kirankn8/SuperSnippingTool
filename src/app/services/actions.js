import { takeScreenShot } from '../utils/capture-screen';
import { startRecording, stopRecording } from '../utils/record-screen';

export function takeScreenshot() {
    takeScreenShot();
}

export function startScreenRecordScreen() {
    startRecording();
}

export function stopScreenRecordScreen() {
    stopRecording();
}

//  to be used: just a small implementation idea
export function Actions(actionName) {
    switch (actionName) {
        case 0: takeScreenShot();
            break;
        case 1: startRecording();
            break;
        case 2: stopRecording();
            break;
        default: takeScreenShot();
    }
}