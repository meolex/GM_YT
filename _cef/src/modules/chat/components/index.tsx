import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Message = {
  text: string;
  id: string;
};

export const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputOpen, setInputOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mp.events) return;

    mp.events.add("chat:push", (text: string) => {
      setMessages((prev) => {
        const next = [...prev, { text, id: crypto.randomUUID() }];
        if (next.length > 50) next.splice(0, next.length - 50);
        return next;
      });
    });

    mp.events.add("chat:active", (active: boolean) => setInputOpen(active));

    return () => {
      mp.events?.remove("chat:push");
      mp.events?.remove("chat:active");
    };
  }, []);

  useEffect(() => {
    if (inputOpen) inputRef.current?.focus();
  }, [inputOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    if (text.startsWith("/") && text.length > 1) mp.invoke("command", text.substring(1));
    else mp.invoke("chatMessage", text);

    setHistory((prev) => [...prev.slice(-4), text]);
    setHistoryIndex(-1);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();

    if (e.key === "ArrowUp") {
      const next = historyIndex + 1;

      if (next < history.length) {
        setInputValue(history[history.length - 1 - next]);
        setHistoryIndex(next);
      }
    }

    if (e.key === "ArrowDown") {
      const next = historyIndex - 1;
      if (next >= 0) {
        setInputValue(history[history.length - 1 - next]);
        setHistoryIndex(next);
      } else {
        setInputValue("");
        setHistoryIndex(-1);
      }
    }
  };

  return (
    <div className="fixed left-0 top-0 flex w-[480px] flex-col gap-1 p-4">
      <ScrollArea className={cn("h-[200px] transition-all duration-300", inputOpen && "rounded-b-lg bg-gradient-to-b from-transparent to-black/50 shadow-lg")}>
        <div className="flex flex-col gap-0.5 px-3 py-2">
          {messages.map((msg) => (
            <p key={msg.id} className="text-sm text-white [text-shadow:_0_1px_3px_black]">
              {msg.text}
            </p>
          ))}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {inputOpen && (
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={150}
          placeholder="Введите сообщение..."
          className="bg-black/50 text-white focus:ring-0 focus:ring-offset-0"
        />
      )}
    </div>
  );
};
