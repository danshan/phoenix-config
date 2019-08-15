import log from './logger';
import {getCurrentWindow} from "./window";
import {restoreMousePositionForWindow, saveMousePositionForWindow} from "./mouse";

export async function launchApp(appName: string) {
    const window = getCurrentWindow();
    if (!window) {
        return;
    } else {
        saveMousePositionForWindow(window);
    }

    let app = App.get(appName);
    if (!app) {
        log('start [', appName, ']');
        app = App.launch(appName, {focus: true});
    } else {
        app.focus();
    }
    let newWindow = _.first(app.windows({visible: true}));
    if (newWindow && window.hash() != newWindow.hash()) {
        restoreMousePositionForWindow(newWindow);
    }

}
