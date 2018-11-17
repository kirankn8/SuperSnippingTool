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
            if (sources[i].name === 'Entire screen' || sources[i].name === 'Screen 1') {
                navigator.mediaDevices.getUserMedia({
                    audio: {
                        mandatory: {
                            chromeMediaSource: 'desktop',
                            chromeMediaSourceId: sources[i].id,
                        }
                    },
                    video: {
                        mandatory: {
                            chromeMediaSource: 'desktop',
                            chromeMediaSourceId: sources[i].id,
                            minWidth: 1280,
                            maxWidth: 1280,
                            minHeight: 720,
                            maxHeight: 720
                        }
                    }
                })
                    .then((stream) => handleStream(stream))
                    .catch((e) => handleError(e));
                return;
            }
        }
    });

    function determineScreenshot() {
        const screenSize = electronScreen.getPrimaryDisplay().workAreaSize;
        const maxDimension = Math.max(screenSize.width, screenSize.height);
        return {
            width: maxDimension * window.devicePixelRatio,
            height: maxDimension * window.devicePixelRatio,
        }
    }


    function handleError(e) {
        console.log(e)
    }

    function handleStream(stream) {
        recorder = new MediaRecorder(stream);
        blobs = [];
        recorder.ondataavailable = function (event) {
            blobs.push(event.data);
        };
        recorder.start();
    }
}


export function pauseRecording() {
    recorder.stop();
}

export function stopRecording() {
    const saveFile = () => {
        // covert browser's array buffer to nodejs buffer
        toArrayBuffer(new Blob(blobs, { type: 'video/webm' }), function (ab) {
            var buffer = toBuffer(ab);
            var file = `C:/Users/KIRAN KN/Desktop/example.webm`;
            fs.writeFile(file, buffer, function (err) {
                if (err) {
                    console.error('Failed to save video ' + err);
                } else {
                    console.log('Saved video: ' + file);
                }
            });
        });
    }
    recorder.onstop = saveFile;
    recorder.stop();

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
}