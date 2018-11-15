const electron = window.require('electron');
const fs = electron.remote.require('fs');
const path = electron.remote.require('path');
const desktopCapturer = electron.desktopCapturer;
const electronScreen = electron.screen;
const shell = electron.shell;

exports.takeScreenShot = function () {
    const thumbSize = determineScreenshot();
    let options = { types: ['screen'], thumbnailSize: thumbSize };

    desktopCapturer.getSources(options, function (error, sources) {
        if (error) return console.log(error.message);
        sources.forEach((source) => {
            console.log(source);
            if (source.name === 'Entire screen' || source.name === 'Screen 1') {
                const screenshotPath = path.join('C:/Users/KIRAN KN/Desktop', 'screenshot.png');
                fs.writeFile(screenshotPath, source.thumbnail.toPNG(), function (err) {
                    if (err) return console.log(err.message);
                    shell.openExternal('file://' + screenshotPath);
                })
            }
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
