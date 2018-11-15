import { takeScreenShot } from '../utils/capture-screen';
import { recordScreen } from '../utils/record-screen';

export function takeScreenshot() {
    takeScreenShot();
}

export function recordEntireScreen() {
    recordScreen();
}
