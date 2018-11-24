const electron = window.require('electron');
const desktopCapturer = electron.desktopCapturer;
const electronScreen = electron.screen;
const { dialog } = electron.remote
const fs = electron.remote.require('fs');

let recorder;
let blobs = [];

export function startRecording() {
    return new Promise(function (resolve, reject) {
        const thumbSize = determineScreenshot();
        //  width: 1360, height: 1360
        let options = { types: ['screen'], thumbnailSize: thumbSize };

        desktopCapturer.getSources(options, function (error, sources) {
            if (error) reject(error.message);
            for (let i = 0; i < sources.length; ++i) {
                if (sources[i].name === 'Entire screen' || sources[i].name === 'Screen 1') {
                    let w = 1280;
                    let h = 720;
                    navigator.mediaDevices.getUserMedia({
                        audio: {
                            mandatory: {
                                chromeMediaSource: 'desktop',
                            }
                        },
                        video: {
                            mandatory: {
                                chromeMediaSource: 'desktop',
                                minWidth: w,
                                maxWidth: w,
                                minHeight: h,
                                maxHeight: h,
                            }
                        }
                    })
                        .then((stream) => handleStream(stream))
                        .catch((e) => handleError(e));
                    resolve();
                }
            }
        });
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
        var options = {
            audioBitsPerSecond: 128000,
            videoBitsPerSecond: 2500000,
            // mimeType: 'video/mp4'
        }
        recorder = new MediaRecorder(stream, options);
        blobs = [];
        recorder.ondataavailable = function (event) {
            blobs.push(event.data);
        };
        recorder.start();
    }
}


export function pauseRecording() {
    // TODO: Pause Recording
    recorder.pause();
}

export function resumeRecording() {
    // TODO: Resume Recording
    recorder.resume()
}

export function stopRecording() {
    return new Promise(function (resolve, reject) {
        const saveFile = () => {
            // convert browser's array buffer to nodejs buffer
            toArrayBuffer(new Blob(blobs, { type: 'video/webm' }), function (ab) {
                var buffer = toBuffer(ab);
                dialog.showSaveDialog({
                    title: 'Save Screen Record',
                    filters: [
                        { name: 'Record', extensions: ['webm'] },
                    ]
                },
                    (filename) => {
                        if (filename) {
                            fs.writeFile(filename, buffer, function (err) {
                                if (err) {
                                    reject('Failed to save video ' + err);
                                } else {
                                    resolve(filename);
                                }
                            });
                        } else {
                            resolve(null);
                        }
                    });
            });
        }
        recorder.onstop = saveFile;
        recorder.stop();
    });

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