import rpc from "rage-rpc";

import { $db } from "@/db";
import { playerTable } from "@/db/schema";
import { compare, hash } from "bcryptjs";
import { eq } from "drizzle-orm";

class Auth {
  constructor() {
    rpc.register("auth:login", this.login.bind(this));
    rpc.register("auth:register", this.register.bind(this));
  }

  async login(data: { email: string; password: string }) {
    if (!data.email || !data.password) return { error: "Пароль и почта не могут быть пустыми!" };

    try {
      const player = await $db.query.playerTable.findFirst({ where: eq(playerTable.email, data.email) });
      if (!player) return { error: "Неверный email или пароль!" };

      const isValidPassword = await compare(data.password, player.passwordHash);
      if (!isValidPassword) return { error: "Неверный email или пароль!" };

      return { data: player };
    } catch (error) {
      console.error("Login error:", error);
      return { error: "Произошла ошибка при входе. Попробуйте позже." };
    }
  }

  async register(data: { email: string; password: string }) {
    if (!data.email || !data.password) return { error: "Пароль и почта не могут быть пустыми!" };

    try {
      const isPlayerExist = await $db.query.playerTable.findFirst({ where: eq(playerTable.email, data.email) });
      if (isPlayerExist) return { error: "Пользователь с такой почтой уже существует!" };

      const passwordHash = await hash(data.password, 10);
      const [newPlayer] = await $db.insert(playerTable).values({ email: data.email, passwordHash }).returning();

      return { data: newPlayer };
    } catch (error) {
      console.error("Registration error:", error);
      return { error: "Произошла ошибка при регистрации. Попробуйте позже." };
    }
  }
}

export const $auth = new Auth();
