class Hud {
  constructor() {
    mp.events.add("render", this.render);
  }

  enableHud = (enable: boolean) => {
    mp.game.ui.displayRadar(enable);
    mp.game.ui.displayHud(enable);
    mp.gui.chat.show(enable);
  };

  private render = () => {
    const componentsToHide = [1, 2, 3, 4, 6, 7, 8, 9, 13];
    componentsToHide.forEach((id) => mp.game.ui.hideHudComponentThisFrame(id));

    mp.game.controls.disableControlAction(0, 37, true);
  };
}

export const $hud = new Hud();
