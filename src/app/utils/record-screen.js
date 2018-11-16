const electron = window.require('electron');
const desktopCapturer = electron.desktopCapturer;
const electronScreen = electron.screen;
const fs = electron.remote.require('fs');

let recorder;
let blobs = [];

export function startRecording() {
    const thumbSize = determineScreenshot();
    let options = { types: ['screen'], thumbnailSize: thumbSize };

    desktopCapturer.getSources(options, function (error, sources) {
        if (error) throw console.log(error.message);
        for (let i = 0; i < sources.length; ++i) {
            console.log(sources);
            if (sources[i].name === 'Electron') {
                navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: {
                        mandatory: thumbSize
                    }
                })
                    .then((stream) => handleStream(stream))
                    .catch((e) => handleError(e))
                return
            }
        }
    });
}


function handleError(e) {
    console.log(e)
}

function handleStream(stream) {
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
    recorder = new MediaRecorder(stream);
    blobs = [];
    recorder.ondataavailable = function (event) {
        blobs.push(event.data);
    };
    recorder.start();
    console.log(recorder);
}

// TODO: Fix stop Recording function
export function stopRecording() {
    console.log(recorder);
    recorder.stop();

    // https://stackoverflow.com/questions/8609289/convert-a-binary-nodejs-buffer-to-javascript-arraybuffer/12101012#12101012
    toArrayBuffer(new Blob(blobs, { type: 'video/webm' }), function (ab) {
        var buffer = toBuffer(ab);
        var file = `./videos/example.webm`;
        fs.writeFile(file, buffer, function (err) {
            if (err) {
                console.error('Failed to save video ' + err);
            } else {
                console.log('Saved video: ' + file);
            }
        });
    });
}

function toArrayBuffer(blob, cb) {
    let fileReader = new FileReader();
    fileReader.onload = function () {
        let arrayBuffer = this.result;
        cb(arrayBuffer);
    };
    fileReader.readAsArrayBuffer(blob);
}

function toBuffer(ab) {
    let buffer = new Buffer(ab.byteLength);
    let arr = new Uint8Array(ab);
    for (let i = 0; i < arr.byteLength; i++) {
        buffer[i] = arr[i];
    }
    return buffer;
}


function determineScreenshot() {
    const screenSize = electronScreen.getPrimaryDisplay().workAreaSize;
    const maxDimension = Math.max(screenSize.width, screenSize.height);
    return {
        width: maxDimension * window.devicePixelRatio,
        height: maxDimension * window.devicePixelRatio,
    }
}
