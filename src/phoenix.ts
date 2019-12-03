import {hyper, hyperCtrl, hyperShift} from './config';
import {onKey} from './key';
import log from './logger';
import {launchApp} from "./launcher";
import {
    fitScreenHeight,
    fitScreenWidth,
    focusOnNextScreen,
    focusOnPreviousScreen,
    moveToNextScreen,
    moveToPreviousScreen
} from "./screen";
import {titleModal} from "./modal";
import {
    downHalfCurrentWindow,
    largerCurrentWindow,
    leftHalfCurrentWindow,
    maximizeCurrentWindow,
    moveCurrentWindow,
    rightHalfCurrentWindow,
    smallerCurrentWindow,
    upHalfCurrentWindow
} from "./window";
import {centerMousePositionForWindow} from "./mouse";

Phoenix.set({
    daemon: true,
    openAtLogin: true,
});

Event.on('screensDidChange', () => {
    log('Screens changed');
});

const closeAppsOnBlur = ['com.apple.Preview', 'com.apple.ActivityMonitor'];
let prevActiveAppClose: App | null = null;
Event.on('appDidActivate', (app, h) => {
    // Close certain apps if they have no windows and lose focus.
    const prevClose = prevActiveAppClose;
    prevActiveAppClose = null;

    const id = app.bundleIdentifier();
    if (closeAppsOnBlur.some(v => v === id)) {
        prevActiveAppClose = app;
    }

    if (
        prevClose &&
        !prevClose.isTerminated() &&
        prevClose.windows().length === 0
    ) {
        prevClose.terminate();
        log('[' + prevClose.bundleIdentifier() + '] terminated by phoenix');
    }
});

/**
 * App configuration
 */

onKey('`', hyper, () => {
    launchApp('iTerm');
});

onKey('1', hyper, () => {
    launchApp('Google Chrome');
});

onKey('2', hyper, () => {
    launchApp('Safari');
});

onKey('3', hyper, () => {
    launchApp('龙信');
});

onKey('4', hyper, () => {
    launchApp('WeChat');
});

onKey('w', hyper, () => {
    launchApp('KeePassXC');
});

onKey('e', hyper, () => {
    launchApp('Sublime Text');
});

onKey('r', hyper, () => {
    launchApp('Reminders');
});

onKey('t', hyper, () => {
    launchApp('Tweetbot');
});

onKey('s', hyper, () => {
    // launchApp('IntelliJ IDEA Community');
    launchApp('IntelliJ IDEA Ultimate Release');
    //launchApp('IntelliJ IDEA Ultimate EAP');
});

onKey('d', hyper, () => {
    launchApp('WebStorm');
});

onKey(',', hyper, () => {
    launchApp('Quiver');
});

onKey('.', hyper, () => {
    // launchApp('Microsoft Outlook');
    launchApp('Mail');
});

onKey('/', hyper, () => {
    launchApp('Finder');
});

onKey(';', hyper, () => {
    launchApp('Preview');
});

onKey('n', hyper, () => {
    launchApp('Slack');
});

onKey('b', hyper, () => {
    launchApp('BearyChat');
});


/**
 * Screen configuration
 */

// focus next screen
onKey('l', hyper, () => {
    focusOnNextScreen();
});

// focus previous screen
onKey('h', hyper, () => {
    focusOnPreviousScreen();
});

// move to next screen
onKey('l', hyperShift, () => {
    moveToNextScreen();
});

// move to previous screen
onKey('h', hyperShift, () => {
    moveToPreviousScreen();
});

onKey('space', hyper, () => {
    centerMousePositionForWindow();
});


/**
 * window configuartion
 */
// Window maximize
onKey('m', hyperShift, () => {
    maximizeCurrentWindow();
});
// Window smaller
onKey('-', hyper, () => {
    smallerCurrentWindow();
});
// Window larger
onKey('=', hyper, () => {
    largerCurrentWindow();
});
onKey('left', hyperCtrl, () => {
    leftHalfCurrentWindow();
});
onKey('right', hyperCtrl, () => {
    rightHalfCurrentWindow();
});
onKey('up', hyperCtrl, () => {
    upHalfCurrentWindow();
});
onKey('down', hyperCtrl, () => {
    downHalfCurrentWindow();
});
// Window fit screen height
onKey('\\', hyper, () => {
    fitScreenHeight();
});
// Window fit screen width
onKey('\\', hyperShift, () => {
    fitScreenWidth();
});
// Window <
onKey('h', hyperCtrl, function () {
    moveCurrentWindow(-100, 0);
});
// Window >
onKey('l', hyperCtrl, function () {
    moveCurrentWindow(100, 0);
});
// Window ^
onKey('k', hyperCtrl, function () {
    moveCurrentWindow(0, -100);
});
// Window v
onKey('j', hyperCtrl, function () {
    moveCurrentWindow(0, 100);
});


const phoenixApp = App.get('Phoenix');
titleModal('Phoenix (re)loaded!', 2, phoenixApp && phoenixApp.icon());

