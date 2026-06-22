"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import {
  CHAT_QUICK_ACTIONS,
  CHAT_WELCOME_MESSAGE,
  getBotResponse,
  getQuickActionResponse,
  shouldScrollToCalculator,
  shouldScrollToPackages,
  type QuickActionId,
} from "@/lib/chatbot";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "bot" | "user";
  content: string;
};

function renderMessageContent(content: string) {
  const parts = content.split(/(\*\*[^*]+\*\*|\n|\/quote|\/locations\/[^\s]+|\/#calculator|\/#packages)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-inherit">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part === "\n") {
      return <br key={index} />;
    }

    if (part === "/quote") {
      return (
        <Link
          key={index}
          href="/quote"
          className="font-semibold text-huglo-gold underline underline-offset-2"
        >
          free quote page
        </Link>
      );
    }

    if (part.startsWith("/locations/")) {
      return (
        <Link
          key={index}
          href={part}
          className="font-semibold text-huglo-gold underline underline-offset-2"
        >
          learn more
        </Link>
      );
    }

    if (part === "/#calculator") {
      return (
        <a
          key={index}
          href="/#calculator"
          className="font-semibold text-huglo-gold underline underline-offset-2"
        >
          AI Calculator
        </a>
      );
    }

    if (part === "/#packages") {
      return (
        <a
          key={index}
          href="/#packages"
          className="font-semibold text-huglo-gold underline underline-offset-2"
        >
          solar packages
        </a>
      );
    }

    return part;
  });
}

export function SolarChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "bot",
          content: CHAT_WELCOME_MESSAGE,
        },
      ]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  const addBotReply = (content: string, userText?: string) => {
    setTyping(true);
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-bot`, role: "bot", content },
      ]);
      setTyping(false);

      if (userText && shouldScrollToCalculator(userText)) {
        document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
      }
      if (userText && shouldScrollToPackages(userText)) {
        document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
      }
    }, 700);
  };

  const sendUserMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-user`, role: "user", content: trimmed },
    ]);
    setInput("");
    addBotReply(getBotResponse(trimmed), trimmed);
  };

  const handleQuickAction = (actionId: QuickActionId) => {
    const label = CHAT_QUICK_ACTIONS.find((a) => a.id === actionId)?.label ?? actionId;
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-user`, role: "user", content: label },
    ]);

    if (actionId === "savings") {
      addBotReply(getQuickActionResponse("savings"), "calculator");
      window.setTimeout(() => {
        document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
      }, 900);
      return;
    }

    if (actionId === "products") {
      addBotReply(getQuickActionResponse("products"), "packages");
      window.setTimeout(() => {
        document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
      }, 900);
      return;
    }

    addBotReply(getQuickActionResponse(actionId));
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="fixed right-4 bottom-24 z-[9000] flex max-h-[min(640px,calc(100vh-7rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1e] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)] sm:right-6 sm:bottom-28"
          >
            <div className="border-b border-white/10 bg-[linear-gradient(135deg,rgba(255,172,0,0.15),rgba(10,15,30,0.95))] px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-huglo-gold/20">
                    <Bot className="size-5 text-huglo-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-white">
                      AI Solar Assistant
                    </h3>
                    <p className="text-xs text-white/55">
                      Powered by advanced solar analytics
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex size-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close chat"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {CHAT_QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => handleQuickAction(action.id)}
                    disabled={typing}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/85 transition-colors hover:border-huglo-gold/40 hover:bg-huglo-gold/10 disabled:opacity-50"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      message.role === "user"
                        ? "rounded-br-md bg-huglo-gold text-huglo-black"
                        : "rounded-bl-md border border-white/8 bg-white/[0.05] text-white/90"
                    )}
                  >
                    {message.role === "bot"
                      ? renderMessageContent(message.content)
                      : message.content}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-white/8 bg-white/[0.05] px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="size-2 animate-bounce rounded-full bg-huglo-gold [animation-delay:0ms]" />
                      <span className="size-2 animate-bounce rounded-full bg-huglo-gold [animation-delay:150ms]" />
                      <span className="size-2 animate-bounce rounded-full bg-huglo-gold [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendUserMessage(input);
              }}
              className="border-t border-white/10 p-4"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about solar, savings, rebates..."
                  disabled={typing}
                  className="h-11 flex-1 rounded-full border border-white/10 bg-white/[0.05] px-4 text-sm text-white placeholder:text-white/35 outline-none focus:border-huglo-gold/50 focus:ring-2 focus:ring-huglo-gold/15 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-huglo-gold text-huglo-black transition-opacity hover:opacity-90 disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="size-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "fixed right-4 bottom-5 z-[9000] flex items-center gap-2 rounded-full shadow-[0_12px_40px_-8px_rgba(255,172,0,0.55)] sm:right-6 sm:bottom-6",
          open
            ? "size-14 justify-center bg-huglo-black text-white"
            : "bg-huglo-gold px-4 py-3 text-huglo-black sm:px-5"
        )}
        aria-label={open ? "Close AI Solar Assistant" : "Open AI Solar Assistant"}
      >
        {open ? (
          <X className="size-6" />
        ) : (
          <>
            <MessageCircle className="size-5 shrink-0 sm:size-6" />
            <span className="text-xs font-bold sm:text-sm">AI Chat</span>
          </>
        )}
      </motion.button>
    </>
  );
}
