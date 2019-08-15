import log from './logger';
import {getCurrentWindow} from "./window";

const mousePositions: Map<number, Point> = new Map();

export {saveMousePositionForWindow, restoreMousePositionForWindow, centerMousePositionForWindow};

function saveMousePositionForWindow(window: Window): void {
    if (!window) return;
    let pos = Mouse.location();

    mousePositions.set(window.hash(), pos);
    log('save mouse pos for [', window.app().name(), '], [', pos.x, ",", pos.y, ']');
}

function restoreMousePositionForWindow(window: Window): void {
    if (!mousePositions.has(window.hash())) {
        return;
    }

    let pos = mousePositions.get(window.hash());
    let rect = window.frame();
    if (pos.x < rect.x || pos.x > (rect.x + rect.width) || pos.y < rect.y || pos.y > (rect.y + rect.height)) {
        return;
    }
    log('move mouse to pos for [', window.app().name(), '], [', pos.x, ',' + pos.y, ']');
    Mouse.move(pos);
}

function centerMousePositionForWindow(): void {
    const window = getCurrentWindow();
    if (!window) return;

    Mouse.move({
        x: window.topLeft().x + window.frame().width / 2,
        y: window.topLeft().y + window.frame().height / 2
    });
}
