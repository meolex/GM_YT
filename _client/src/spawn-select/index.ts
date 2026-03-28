import rpc from "rage-rpc";

import { $browser, ROUTES } from "@/browser";
import { $hud } from "@/hud";

class SpawnSelect {
  constructor() {
    rpc.register("spawn-select:start", this.start);
    rpc.register("spawn-select:finish", this.finish);
  }

  private start = () => {
    mp.console.logInfo("Spawn select started");
    $browser.enableCursor(true);
    $browser.navigateTo({ to: ROUTES.SPAWN_SELECT });
    $hud.enableHud(false);
    mp.game.graphics.transitionToBlurred(500);
  };

  private finish = () => {
    $browser.enableCursor(false);
    $browser.navigateTo({ to: ROUTES.HUD });
    $hud.enableHud(true);
    mp.game.graphics.transitionFromBlurred(500);
  };
}

export default new SpawnSelect();
