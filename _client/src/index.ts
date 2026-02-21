mp.events.add("playerReady", (player) => {
  mp.gui.chat.push("CLIENT: Hello, welcome to the server!");
});

mp.browsers.new("package://cef/index.html");

setTimeout(() => {
  mp.gui.cursor.show(true, true);
}, 1000);
