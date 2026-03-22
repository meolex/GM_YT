import rpc from "rage-rpc";

import { $browser, ROUTES } from "@/browser";

class Auth {
  constructor() {
    rpc.register("auth:start", this.start);
    rpc.register("auth:finish", this.finish);
  }

  start = () => {
    $browser.enableCursor(true);
    $browser.navigateTo({ to: ROUTES.AUTH });
  };

  finish = () => {
    $browser.enableCursor(false);
    $browser.navigateTo({ to: ROUTES.HUD });
  };
}

export default new Auth();
