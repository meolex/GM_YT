import "rage-rpc";

mp.browsers.new("http://localhost:5173/");

setTimeout(() => {
  mp.gui.cursor.show(true, true);
}, 1000);
