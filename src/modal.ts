export {titleModal};

function titleModal(text: string, duration: number = 1, icon ?: Phoenix.Icon) {
    const modal = new Modal();
    modal.text = text;
    modal.duration = duration;
    if (icon) {
        modal.icon = icon;
    }

    modal.showTitleOn(Screen.main());
}

Modal.prototype.showTitleOn = function _showTitleOn(screen: Screen) {
    showAt(this, screen, 2, 1 + 1 / 3);
};

Modal.prototype.showCenterOn = function _showCenterOn(screen: Screen) {
    showAt(this, screen, 2, 2);
};

function showAt(
    modal: Modal,
    screen: Screen,
    widthDiv: number,
    heightDiv: number,
) {
    const {height, width, x, y} = modal.frame();
    const sf = screen.visibleFrame();
    modal.origin = {
        x: sf.x + (sf.width / widthDiv - width / 2),
        y: sf.y + (sf.height / heightDiv - height / 2),
    };
    modal.show();
}
