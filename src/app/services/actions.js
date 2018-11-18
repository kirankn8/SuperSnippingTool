import { takeScreenShot } from '../utils/capture-screen';
import { startRecording, stopRecording } from '../utils/record-screen';

export function takeScreenshot() {
    takeScreenShot();
}

export function startScreenRecordScreen() {
    return startRecording();
}

export function stopScreenRecordScreen() {
    return stopRecording();
}