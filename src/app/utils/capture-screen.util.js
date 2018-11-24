const electron = window.require('electron');
const fs = electron.remote.require('fs');
const { dialog } = electron.remote
const desktopCapturer = electron.desktopCapturer;
const electronScreen = electron.screen;

export function takeScreenShot() {
    return new Promise(function (resolve, reject) {
        const thumbSize = determineScreenshot();
        let options = { types: ['screen'], thumbnailSize: thumbSize };

        desktopCapturer.getSources(options, function (error, sources) {
            if (error) return reject(error.message);
            sources.forEach((source) => {
                if (source.name === 'Entire screen' || source.name === 'Screen 1') {
                    dialog.showSaveDialog({
                        title: 'Save Screenshot',
                        filters: [
                            { name: 'Images', extensions: ['png', 'jpg', 'jpeg'] },
                        ]
                    },
                        (filename) => {
                            if (filename) {
                                const fileExt = filename.split('.').pop();
                                if (fileExt === 'png') {
                                    fs.writeFile(filename, source.thumbnail.toPNG(), function (err) {
                                        if (err) return reject(err.message);
                                    });
                                } else {
                                    fs.writeFile(filename, source.thumbnail.toJPEG(100), function (err) {
                                        if (err) return reject(err.message);
                                    });
                                }
                                resolve(filename);
                            } else {
                                resolve(null);
                            }
                        });
                }
            });
        });
    });
}

function determineScreenshot() {
    const screenSize = electronScreen.getPrimaryDisplay().workAreaSize;
    const maxDimension = Math.max(screenSize.width, screenSize.height);
    return {
        width: maxDimension * window.devicePixelRatio,
        height: maxDimension * window.devicePixelRatio,
    }
}
