import rpc from "rage-rpc";

export const ROUTES = {
  AUTH: "/auth",
  HUD: "/hud",
  CREATE_CHARACTER: "/create-character",
};

class Browser {
  private url = "http://localhost:5173/"; // "package://cef/index.html";
  private browser: BrowserMp;

  constructor() {
    this.init();
  }

  init() {
    this.browser = mp.browsers.new(this.url);
    return this.browser;
  }

  navigateTo({ to, state }: { to: string; state?: any }) {
    rpc.callBrowsers("cef:navigateTo", { to, state });
  }

  enableCursor(enable: boolean) {
    if (!enable) return mp.gui.cursor.show(false, false);
    setTimeout(() => mp.gui.cursor.show(true, true), 300);
  }
}

export const $browser = new Browser();
