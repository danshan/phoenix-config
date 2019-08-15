export {
    getCurrentWindow,
    sortByMostRecent,
    maximizeCurrentWindow,
    smallerCurrentWindow,
    largerCurrentWindow,
    leftHalfCurrentWindow,
    rightHalfCurrentWindow,
    upHalfCurrentWindow,
    downHalfCurrentWindow,
    moveCurrentWindow,
};

function getCurrentWindow(): Window {
    let window = Window.focused();
    if (!window) {
        window = App.focused().mainWindow();
    }
    if (!window) {
        return null;
    } else {
        return window;
    }
}

function sortByMostRecent(windows: Window[]): Window[] {
    let visibleAppMostRecentFirst = _.map(
        Window.recent(), function (window: Window) {
            return window.hash();
        }
    );
    let visibleAppMostRecentFirstWithWeight = _.zipObject(
        visibleAppMostRecentFirst, _.range(visibleAppMostRecentFirst.length)
    );
    return _.sortBy(windows, function (window: Window) {
        return visibleAppMostRecentFirstWithWeight[window.hash()];
    });
}

function maximizeCurrentWindow(): void {
    let window = getCurrentWindow();
    if (!window) return;

    window.maximize();
}

function smallerCurrentWindow(): void {
    let window = getCurrentWindow();
    if (!window) return;
    let screenFrame = window.screen().flippedVisibleFrame();

    var originFrame = window.frame();
    var frame = getSmallerFrame(originFrame);
    window.setFrame(adapterScreenFrame(frame, screenFrame));
}

function largerCurrentWindow(): void {
    let window = getCurrentWindow();
    if (!window) return;
    const screenFrame = window.screen().flippedVisibleFrame();

    const originFrame = window.frame();
    const frame = getLargerFrame(originFrame);
    window.setFrame(adapterScreenFrame(frame, screenFrame));
}

function getSmallerFrame(frame: Rectangle) {
    return getResizeFrame(frame, 0.9);
}

function getLargerFrame(frame: Rectangle) {
    return getResizeFrame(frame, 1.1);
}

function getResizeFrame(frame: Rectangle, ratio: number) {
    return {
        x: Math.round(frame.x + frame.width / 2 * (1 - ratio)),
        y: Math.round(frame.y + frame.height / 2 * (1 - ratio)),
        width: Math.round(frame.width * ratio),
        height: Math.round(frame.height * ratio)
    }
}

function adapterScreenFrame(windowFrame: Rectangle, screenFrame: Rectangle) {
    return {
        x: Math.max(screenFrame.x, windowFrame.x),
        y: Math.max(screenFrame.y, windowFrame.y),
        width: Math.min(screenFrame.width, windowFrame.width),
        height: Math.min(screenFrame.height, windowFrame.height)
    };
}

function leftHalfCurrentWindow(): void {
    let window = getCurrentWindow();
    if (!window) return;

    const {width, height, x, y} = window.screen().flippedVisibleFrame();
    const frame2 = {width: Math.floor(width / 2), height, x, y};
    const frame3 = {width: Math.floor(width / 3), height, x, y};
    const frame4 = {width: Math.floor(width / 4), height, x, y};
    let frame = frame2;

    if (objEq(window.frame(), frame2)) {
        frame = frame3;
    }
    if (objEq(window.frame(), frame3)) {
        frame = frame4;
    }

    window.setFrame(frame);
}

function rightHalfCurrentWindow(): void {
    let window = getCurrentWindow();
    if (!window) return;

    const {width, height, x, y} = window.screen().flippedVisibleFrame();
    const frame2 = {width: Math.floor(width / 2), height, x: x + Math.ceil(width / 2), y};
    const frame3 = {width: Math.floor(width / 3), height, x: x + Math.ceil(width / 3) * 2, y};
    const frame4 = {width: Math.floor(width / 4), height, x: x + Math.ceil(width / 4) * 3, y};
    let frame = frame2;

    if (objEq(window.frame(), frame2)) {
        frame = frame3;
    }
    if (objEq(window.frame(), frame3)) {
        frame = frame4;
    }

    window.setFrame(frame);
}

function upHalfCurrentWindow(): void {
    let window = getCurrentWindow();
    if (!window) return;

    const {width, x} = window.frame();
    const {height, y} = window.screen().flippedVisibleFrame();
    let frame = {width, height: Math.ceil(height / 2), x, y}

    window.setFrame(frame);
}

function downHalfCurrentWindow(): void {
    let window = getCurrentWindow();
    if (!window) return;

    const {width, x} = window.frame();
    const {height, y} = window.screen().flippedVisibleFrame();
    let frame = {width, height: Math.ceil(height / 2), x, y: y + Math.floor(height / 2)};

    window.setFrame(frame);
}

function objEq(a: { [key: string]: any }, b: { [key: string]: any }) {
    const akeys = Object.keys(a);
    if (akeys.length !== Object.keys(b).length) {
        return false;
    }
    return akeys.every(k => a[k] === b[k]);
}

function moveCurrentWindow(offsetX: number, offsetY: number) {
    const window = getCurrentWindow();
    if (!window) return;

    let frame = {
        width: window.frame().width,
        height: window.frame().height,
        x: window.frame().x + offsetX,
        y: window.frame().y + offsetY,
    };
    window.setFrame(frame);
}
