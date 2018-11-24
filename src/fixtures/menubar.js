const { Menu } = require('electron')

function setMenu(win) {
    // TODO: Add options in Menubar

    if (process.env.NODE_ENV !== 'dev') {
        // const template = [];
        // const menu = Menu.buildFromTemplate(template)
        // Menu.setApplicationMenu(menu);
        // win.setMenu(null);
    }
}

module.exports = setMenu;