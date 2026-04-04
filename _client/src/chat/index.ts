import { $browser } from "@/browser";

class Chat {
  private isOpen = false;

  constructor() {
    mp.keys.bind(0x75, true, this.openChat); // F6

    mp.events.add("playerChat", this.closeChat);
    mp.events.add("playerCommand", this.closeChat);
  }

  private openChat = () => {
    mp.console.logInfo("Chat opened");
    if (this.isOpen) return this.closeChat();

    this.isOpen = true;
    $browser.openChat(true);
    $browser.enableCursor(true);
  };

  private closeChat = () => {
    this.isOpen = false;

    $browser.openChat(false);
    $browser.enableCursor(false);
  }
}

export default new Chat();
