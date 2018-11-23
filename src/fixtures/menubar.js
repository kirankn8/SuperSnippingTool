const { Menu } = require('electron')

function setMenu() {
    // TODO: Add options in Menubar
    const template = [];
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu);
}

module.exports = setMenu;