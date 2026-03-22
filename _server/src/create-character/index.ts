import rpc from "rage-rpc";

import { $db } from "@/db";
import { playerApperanceTable } from "@/db/schema";
import { $player } from "@/player";
import { PlayerAppearance } from "@/player/types";

import { CreateCharacterData } from "./types";

class CreateCharacter {
  constructor() {
    rpc.register("create-character:create", this.createCharacter);
  }

  start(player: PlayerMp) {
    rpc.callClient(player, "create-character:start");
    $player.teleportToCoord(player, new mp.Vector3(-591.5745, 40.3543, 87.4189), -3.5519);
  }

  private createCharacter = async (data: CreateCharacterData, { player }: RPCEvent) => {
    try {
      if (!player) return { error: "Ошибка при создании персонажа #1" };

      const [apperance] = await $db
        .insert(playerApperanceTable)
        .values({
          ...data.headBlendData,
          ...data.headOverlay,
          ...data.faceFeature,
          ...data.colors,
          playerId: player._id,
        })
        .returning();

      if (!apperance) return { error: "Ошибка при создании персонажа #2" };

      this.finish(player, apperance);
      return { data: apperance };
    } catch (error) {
      console.log("error creating character", error);
      return { error: "Ошибка при создании персонажа #4" };
    }
  };

  private finish(player: PlayerMp, appearance: PlayerAppearance) {
    rpc.callClient(player, "create-character:finish");
    $player.setPlayerAppearance(player, appearance);
    $player.teleportPlayerToSpawn(player);
  }
}

export const $createCharacter = new CreateCharacter();
