import rpc from "rage-rpc";

import { $browser } from "@/browser";

class Auth {
  constructor() {
    rpc.register("auth:showLogin", this.showLogin.bind(this));
  }

  showLogin() {
    $browser.enableCursor(true);
    $browser.navigatoTo({ to: "/auth" });
  }
}

export default new Auth();
