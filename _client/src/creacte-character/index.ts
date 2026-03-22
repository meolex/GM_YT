import rpc from "rage-rpc";

import { $browser, ROUTES } from "@/browser";
import { $camera } from "@/camera";
import { $hud } from "@/hud";

import { CreateCharacterData } from "./types";

const featureKeys: (keyof CreateCharacterData["faceFeature"])[] = [
  "noseWidth",
  "noseHeight",
  "noseLength",
  "noseBridge",
  "noseTip",
  "noseBridgeShift",
  "browHeight",
  "browWidth",
  "cheekboneHeight",
  "cheekboneWidth",
  "cheeksWidth",
  "eyes",
  "lips",
  "jawWidth",
  "jawHeight",
  "chinLength",
  "chinPosition",
  "chinWidth",
  "chinShape",
  "neckWidth",
];

const sexes = {
  male: mp.game.joaat("mp_m_freemode_01"),
  female: mp.game.joaat("mp_f_freemode_01"),
};

const clothesFixes = {
  male: {
    tops: {
      3: { torso: 15, undershirt: 0 },
      7: { torso: 15, undershirt: 0 },
      9: { torso: 15, undershirt: 15 },
    } as { [key: number]: { torso: number; undershirt: number } },
  },
  female: {
    tops: {
      0: { torso: 0, undershirt: 0 },
      3: { torso: 0, undershirt: 2 },
      9: { torso: 0, undershirt: 2 },
      75: { torso: 0, undershirt: 2 },
    } as { [key: number]: { torso: number; undershirt: number } },
  },
};

class CreateCharacter {
  constructor() {
    rpc.register("create-character:start", this.start);
    rpc.register("create-character:finish", this.finish);

    rpc.register("create-character:rotate-character", this.rotateCharacter);

    rpc.register("create-character:interpolate-face", this.interpolateFace);
    rpc.register("create-character:interpolate-full", this.interpolateFull);

    rpc.register("create-character:update-head-blend", this.updateHeadBlend);
    rpc.register("create-character:update-head-overlay", this.updateHeadOverlay);
    rpc.register("create-character:update-face-feature", this.updateFaceFeature);
    rpc.register("create-character:update-clothes", this.updateClothes);
    rpc.register("create-character:update-colors", this.updateColors);
  }

  private updateHeadBlend = (data: CreateCharacterData["headBlendData"]) => {
    const { father, mother, similarity, skinTone, sex } = data;

    mp.console.logInfo(`Updating head blend: father=${father}, mother=${mother}`);

    mp.players.local.model = sexes[sex];
    mp.players.local.setHeadBlendData(mother, father, 0, mother, father, 0, similarity, skinTone, 0, true);
  };

  private updateHeadOverlay = (data: Partial<CreateCharacterData["headOverlay"]>) => {
    mp.players.local.setHeadOverlay(0, data.blemishes || -1, 1, 0, 0);
    mp.players.local.setHeadOverlay(2, data.eyebrows || -1, 1, 0, 0);
    mp.players.local.setHeadOverlay(3, data.ageing || -1, 1, 0, 0);
    mp.players.local.setHeadOverlay(4, data.makeup || -1, 1, 0, 0);
    mp.players.local.setHeadOverlay(6, data.complexion || -1, 1, 0, 0);
    mp.players.local.setHeadOverlay(7, data.sunDamage || -1, 1, 0, 0);
    mp.players.local.setHeadOverlay(8, data.lipstick || -1, 1, 0, 0);
    mp.players.local.setHeadOverlay(9, data.molesFreckles || -1, 1, 0, 0);
  };

  private updateFaceFeature = (data: CreateCharacterData["faceFeature"]) => {
    featureKeys.forEach((key, index) => mp.players.local.setFaceFeature(index, data[key]));
  };

  private updateColors = (data: Partial<CreateCharacterData["colors"]>) => {
    mp.players.local.setComponentVariation(2, data?.hairStyle || 0, 0, 0);
    mp.players.local.setHeadOverlay(1, data?.facialHair || -1, 1, data?.beardColor || -1, 0);

    mp.players.local.setHairColor(data?.hairColor || 0, 0);
    mp.players.local.setEyeColor(data?.eyeColor || 0);
  };

  private updateClothes = (data: Partial<CreateCharacterData["clothes"]>) => {
    const sex = mp.players.local.model === sexes.male ? "male" : "female";

    mp.players.local.setComponentVariation(8, 15, 0, 0);

    this.setTopWithFix(data?.TORSO || 0, sex);
    mp.players.local.setComponentVariation(4, data?.LEGS || 0, 0, 0);
    mp.players.local.setComponentVariation(6, data?.FEET || 0, 0, 0);
  };

  private setTopWithFix(topId: number, sex: "male" | "female" = "male") {
    mp.players.local.setComponentVariation(11, topId, 0, 0);

    const fix = clothesFixes[sex]?.tops?.[topId];

    if (fix) {
      mp.players.local.setComponentVariation(3, fix.torso, 0, 0);
      mp.players.local.setComponentVariation(8, fix.undershirt, 0, 0);
    }
  }

  private start = () => {
    $browser.enableCursor(true);
    $browser.navigateTo({ to: ROUTES.CREATE_CHARACTER });

    this.initCamera();
  };

  private finish = () => {
    $browser.enableCursor(false);
    $browser.navigateTo({ to: ROUTES.HUD });

    this.removeCamera();
  };

  private initCamera = () => {
    mp.players.local.setComponentVariation(4, 4, 0, 0);
    mp.players.local.setComponentVariation(6, 1, 0, 0);

    $camera.createCamera("create-character", new mp.Vector3(-591.4437, 41.0365, 88.1505));
    $camera.setCameraLookAt("create-character", new mp.Vector3(-591.4425, 40.6044, 88.0806));
    $camera.setCameraActive("create-character");
    $hud.enableHud(false);
  };

  private removeCamera = () => {
    $camera.destroyCamera("create-character");
    $hud.enableHud(true);
  };

  private rotateCharacter = (angle: string) => {
    mp.players.local.setHeading(+angle);
  };

  private interpolateFace = () => {
    $camera.setCameraInterpolate("create-character", new mp.Vector3(-591.4437, 41.0365, 88.1505), new mp.Vector3(-591.4425, 40.6044, 88.0806), 500);
  };

  private interpolateFull = () => {
    $camera.setCameraInterpolate("create-character", new mp.Vector3(-590.992, 42.9262, 87.5305), new mp.Vector3(-591.1784, 39.1546, 87.3555), 500);
  };
}

export default new CreateCharacter();
