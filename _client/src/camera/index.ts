class helperCamera {
  name: string;
  cam: CameraMp;

  constructor(name: string, cam: CameraMp) {
    this.name = name;
    this.cam = cam;
  }
}

class helperGarbage {
  oldCamera: CameraMp;
  currentCamera: CameraMp;

  constructor(oldCamera: CameraMp, currentCamera: CameraMp) {
    this.oldCamera = oldCamera;
    this.currentCamera = currentCamera;
  }
}

class Camera {
  list: helperCamera[] = [];
  garbage: helperGarbage[] = [];

  constructor() {
    this.collectInterpolationGarbage();
  }

  getCameraPov() {}

  createCamera(name: string, position: Vector3) {
    const camera = this.list.find((element) => element.name == name);

    if (camera) {
      if (mp.cameras.exists(camera.cam)) camera.cam.destroy();

      camera.cam = mp.cameras.new(name, position, new mp.Vector3(0, 0, 0), 50);
      camera.name = name;
    } else {
      this.list.push(new helperCamera(name, mp.cameras.new(name, position, new mp.Vector3(0, 0, 0), 50)));
    }
  }

  setCameraActive(name: string) {
    const camera = this.list.find((element) => element.name == name);
    if (!camera) return;

    if (!mp.cameras.exists(camera.cam)) return false;
    camera.cam.setActive(true);
    return mp.game.cam.renderScriptCams(true, false, 0, false, false);
  }

  setCameraEntity(name: string, entity: PlayerMp) {
    if (entity == undefined) return;
    if (!mp.players.exists(entity)) return;

    const camera = this.list.find((element) => element.name == name);

    if (!camera) return;

    if (mp.cameras.exists(camera.cam)) {
      camera.cam.pointAt(entity.handle, 0.0, 0.0, 0.0, true);
    }
  }

  setCameraPosition(name: string, position: Vector3) {
    const camera = this.list.find((element) => element.name == name);
    if (!camera) return;

    if (mp.cameras.exists(camera.cam)) {
      camera.cam.setCoord(position.x, position.y, position.z);
    }
  }

  setCameraLookAt(name: string, position: Vector3) {
    const camera = this.list.find((element) => element.name == name);

    if (!camera) return;
    if (mp.cameras.exists(camera.cam)) {
      camera.cam.pointAtCoord(position.x, position.y, position.z);
    }
  }

  setCameraInterpolate(name: string, position: Vector3, pointAt: Vector3, duration: number) {
    const camera = this.list.find((element) => element.name == name);

    if (camera) {
      const tempCamera = mp.cameras.new("InterpolateCamera", position, new mp.Vector3(0, 0, 0), camera.cam.getFov());
      tempCamera.pointAtCoord(pointAt.x, pointAt.y, pointAt.z);

      tempCamera.setActiveWithInterp(camera.cam.handle, duration, 0, 0);
      mp.game.cam.renderScriptCams(true, false, 0, false, false);

      this.addInterpolationGargabe(camera.cam, tempCamera);
      camera.cam = tempCamera;
    }
  }

  destroyCamera(name: string) {
    const camera = this.list.find((element) => element.name == name);
    if (!camera) return;

    this.deleteAllInterpolations();
    if (!mp.cameras.exists(camera.cam)) return;

    camera.cam.setActive(false);
    camera.cam.destroy();
    mp.game.cam.renderScriptCams(false, false, 0, false, false);
  }

  private collectInterpolationGarbage() {
    mp.events.add("render", () => {
      this.garbage.forEach((element: helperGarbage) => {
        if (!mp.cameras.exists(element.oldCamera)) return;

        if (element.oldCamera.isInterpolating()) return;

        if (mp.cameras.exists(element.oldCamera)) element.oldCamera.destroy();

        const index = this.garbage.findIndex((element) => element.currentCamera == element.currentCamera);

        this.garbage.splice(index, 1);
      });
    });
  }

  private addInterpolationGargabe(oldCamera: CameraMp, currentCamera: CameraMp) {
    this.garbage.push(new helperGarbage(oldCamera, currentCamera));
  }

  private deleteAllInterpolations() {
    this.garbage.forEach((element: helperGarbage) => {
      if (!mp.cameras.exists(element.oldCamera)) return;

      element.oldCamera.destroy();

      const index = this.garbage.findIndex((element) => element.currentCamera == element.currentCamera);

      this.garbage.splice(index, 1);
    });
  }
}

export const $camera = new Camera();
