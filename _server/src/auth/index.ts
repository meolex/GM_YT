import rpc from "rage-rpc";

import { $createCharacter } from "@/create-character";
import { $db } from "@/db";
import { playersTable } from "@/db/schema";
import { $player } from "@/player";
import { compare, hash } from "bcryptjs";
import { eq } from "drizzle-orm";

class Auth {
  constructor() {
    mp.events.add("playerReady", this.onPlayerReady.bind(this));

    rpc.register("auth:login", this.login.bind(this));
    rpc.register("auth:register", this.register.bind(this));
  }

  onPlayerReady(player: PlayerMp) {
    rpc.callClient(player, "auth:start");
  }

  async login(data: { email: string; password: string }, { player }: RPCEvent) {
    if (!player) return { error: "Ошибка авторизации!" };
    if (!data.email || !data.password) return { error: "Пароль и почта не могут быть пустыми!" };

    try {
      const dbPlayer = await $db.query.playersTable.findFirst({ where: eq(playersTable.email, data.email), with: { appearance: true } });
      if (!dbPlayer) return { error: "Неверный email или пароль!" };

      const isValidPassword = await compare(data.password, dbPlayer.passwordHash);
      if (!isValidPassword) return { error: "Неверный email или пароль!" };

      player._id = dbPlayer.id;
      player._lastPosition = dbPlayer.position ?? null;

      if (!dbPlayer.appearance) return $createCharacter.start(player);

      $player.setPlayerAppearance(player, dbPlayer.appearance);

      if (player._lastPosition) {
        rpc.callClient(player, "spawn-select:start");
      } else {
        $player.teleportPlayerToSpawn(player);
        rpc.callClient(player, "auth:finish");
      }

      return { data: dbPlayer };
    } catch (error) {
      console.error("Login error:", error);
      return { error: "Произошла ошибка при входе. Попробуйте позже." };
    }
  }

  async register(data: { email: string; password: string }, { player }: RPCEvent) {
    if (!player) return { error: "Ошибка регистрации!" };
    if (!data.email || !data.password) return { error: "Пароль и почта не могут быть пустыми!" };

    try {
      const isPlayerExist = await $db.query.playersTable.findFirst({ where: eq(playersTable.email, data.email) });
      if (isPlayerExist) return { error: "Пользователь с такой почтой уже существует!" };

      const passwordHash = await hash(data.password, 10);
      const [newPlayer] = await $db.insert(playersTable).values({ email: data.email, passwordHash }).returning();

      $createCharacter.start(player);

      return { data: newPlayer };
    } catch (error) {
      console.error("Registration error:", error);
      return { error: "Произошла ошибка при регистрации. Попробуйте позже." };
    }
  }
}

export const $auth = new Auth();
