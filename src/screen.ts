import {getCurrentWindow, sortByMostRecent} from "./window";
import {restoreMousePositionForWindow} from "./mouse";

type FrameRatio = (frame: Rectangle) => Rectangle;

export {
    focusOnNextScreen,
    focusOnPreviousScreen,
    moveToNextScreen,
    moveToPreviousScreen,
    fitScreenHeight,
    fitScreenWidth,
};

function focusOnNextScreen(): void {
    let window = getCurrentWindow();
    if (!window) return;

    let currentScreen = window.screen();
    if (!currentScreen) return;

    let targetScreen = currentScreen.next();

    focusAnotherScreen(window, targetScreen);
}

function focusOnPreviousScreen(): void {
    let window = getCurrentWindow();
    if (!window) return;

    let currentScreen = window.screen();
    if (!currentScreen) return;
    let targetScreen = currentScreen.previous();

    focusAnotherScreen(window, targetScreen);
}

function focusAnotherScreen(
    window: Window,
    targetScreen: Screen
): void {

    if (!window) return;
    let currentSceen = window.screen();
    if (currentSceen == targetScreen) return;

    let targetScreenWindows = sortByMostRecent(targetScreen.windows());
    if (targetScreenWindows.length == 0) return;

    let targetWindow = targetScreenWindows[0];
    targetWindow.focus();

}

function moveToNextScreen(): void {
    const window = getCurrentWindow();
    if (!window) return;

    const oldScreen = window.screen();
    if (!oldScreen) return;
    const newScreen = oldScreen.next();
    if (oldScreen.isEqual(newScreen)) return;

    const move = moveToFrame(
        oldScreen.flippedVisibleFrame(),
        newScreen.flippedVisibleFrame(),
    );
    window.setFrame(move(window.frame()));
    restoreMousePositionForWindow(window);
    window.focus();
}

function moveToPreviousScreen(): void {
    const window = getCurrentWindow();
    if (!window) return;

    const oldScreen = window.screen();
    if (!oldScreen) return;
    const newScreen = oldScreen.previous();
    if (oldScreen.isEqual(newScreen)) return;

    const move = moveToFrame(
        oldScreen.flippedVisibleFrame(),
        newScreen.flippedVisibleFrame(),
    );
    window.setFrame(move(window.frame()));
    restoreMousePositionForWindow(window);
    window.focus();
}

function moveToFrame(a: Rectangle, b: Rectangle): FrameRatio {
    return ({width, height, x, y}) => {
        x = b.x + x - a.x;
        y = b.y + y - b.x;
        return {width, height, x, y};
    }
}

function fitScreenHeight(): void {
    const window = getCurrentWindow();
    if (!window) return;

    window.setFrame({
        x: window.frame().x,
        y: window.screen().flippedVisibleFrame().y,
        width: window.frame().width,
        height: window.screen().flippedVisibleFrame().height
    });
}

function fitScreenWidth(): void {
    const window = getCurrentWindow();
    if (!window) return;

    window.setFrame({
        x: window.screen().flippedVisibleFrame().x,
        y: window.frame().y,
        width: window.screen().flippedVisibleFrame().width,
        height: window.frame().height
    });
}
