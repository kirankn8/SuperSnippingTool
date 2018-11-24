const { remote } = window.require('electron');
let win = remote.getCurrentWindow()

export function resize(width, height) {
    win.setSize(width, height);
}