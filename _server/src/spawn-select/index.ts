import rpc from "rage-rpc";

import { $db } from "@/db";
import { playersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { $player } from '@/player'

class SpawnSelect {
  constructor() {
    mp.events.add("playerQuit", this.onPlayerQuit);
    rpc.register("spawn-select:select", this.onSpawnSelect);
  }

  private async onPlayerQuit(player: PlayerMp) {
    if (!player._id) return;

    try {
      const { x, y, z } = player.position;

      await $db
        .update(playersTable)
        .set({ position: { x, y, z, heading: player.heading } })
        .where(eq(playersTable.id, player._id));
    } catch (error) {
      console.error(error);
    }
  }

  private async onSpawnSelect(data: { type: "last" | "default" }, { player }: RPCEvent) {
    if (!player) return { error: "Ошибка выбора спавна" };

    if (data.type === "last" && player._lastPosition) {
      const { x, y, z, heading } = player._lastPosition;
      $player.teleportToCoord(player, new mp.Vector3(x, y, z), heading);
    } else {
      $player.teleportPlayerToSpawn(player);
    }

    rpc.callClient(player, "spawn-select:finish");
    return { data: true };
  }
}

export const $spawnSelect = new SpawnSelect();
