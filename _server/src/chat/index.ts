class Chat {
  constructor() {
    mp.events.add("playerChat", this.onPlayerChat);
  }

  private onPlayerChat(player: PlayerMp, message: string) {
    mp.players.forEach((p) => p.outputChatBox(`${player.name} говорит: ${message}`));
  }
}

export default new Chat();
