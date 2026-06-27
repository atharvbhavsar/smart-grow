"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, Calculator, Calendar, ArrowRight, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

interface Message {
  sender: "bot" | "user";
  text: string;
  options?: { label: string; action: string }[];
}

export function AiGrowthWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "calc">("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Quote Calculator State
  const [projectType, setProjectType] = useState<string>("website");
  const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<number>(4); // weeks

  // Welcome Messages
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "👋 Hi! I'm GrowBot, your AI Growth Assistant. How can I help accelerate your business today?",
        options: [
          { label: "🧮 Estimate Project Cost", action: "start_calc" },
          { label: "🤖 AI Solutions Help", action: "ai_help" },
          { label: "📞 Book Free Discovery Call", action: "book_call" },
        ],
      },
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOptionClick = (action: string, label: string) => {
    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: label }]);

    // Bot responds
    setTimeout(() => {
      if (action === "start_calc") {
        setActiveTab("calc");
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "I've opened our interactive Cost Estimator tab for you! Select your project type and scope, and you'll get an instant timeline and budget estimate.",
          },
        ]);
      } else if (action === "ai_help") {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "AI is rewriting operations. We deploy context-aware autonomous agents (handling customer questions 24/7) and backend workflow automations (moving data between CRM, email, and databases).",
            options: [
              { label: "See Packages Preview", action: "go_packages" },
              { label: "Contact Human Expert", action: "go_contact" },
            ],
          },
        ]);
      } else if (action === "book_call") {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Brilliant! You can lock in a 1-on-1 strategy call with our founder Aashish Jhumle directly from our Contact page. Would you like me to redirect you?",
            options: [
              { label: "Go to Contact Page", action: "go_contact" },
              { label: "Ask Another Question", action: "reset_chat" },
            ],
          },
        ]);
      } else if (action === "go_packages") {
        window.location.href = "/packages";
        setIsOpen(false);
      } else if (action === "go_contact") {
        window.location.href = "/contact";
        setIsOpen(false);
      } else if (action === "reset_chat") {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "How else can I assist you?",
            options: [
              { label: "🧮 Estimate Project Cost", action: "start_calc" },
              { label: "🤖 AI Solutions Help", action: "ai_help" },
              { label: "📞 Book Free Discovery Call", action: "book_call" },
            ],
          },
        ]);
      }
    }, 600);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputValue("");

    setTimeout(() => {
      const lower = userText.toLowerCase();
      let response = "I appreciate that. We build bespoke systems to solve that. The best next step is booking a 30-minute discovery call to map out a clear solution blueprint.";
      let options = [
        { label: "📞 Book Discovery Call", action: "go_contact" },
        { label: "🧮 Estimate Project Cost", action: "start_calc" }
      ];

      if (lower.includes("price") || lower.includes("cost") || lower.includes("budget")) {
        response = "Our packages start at $2,499. You can use the Estimator tab inside this widget to customize your features and get a detailed quote.";
      } else if (lower.includes("ai") || lower.includes("automation") || lower.includes("agent")) {
        response = "We build custom LLM workflows (Make/Zapier) and context-aware agents. For example, our email auto-routing agents can cut triage workloads by up to 85%.";
      } else if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
        response = "Hello! I am GrowBot. How can I help you grow your business today?";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: response,
          options
        },
      ]);
    }, 600);
  };

  // Pricing calculations
  const calculateTotal = () => {
    let base = 2500;
    if (projectType === "webapp") base = 5000;
    if (projectType === "automation") base = 3000;
    if (projectType === "agent") base = 4000;
    if (projectType === "creative") base = 1500;

    const featuresCost = features.length * 750;
    return base + featuresCost;
  };

  const handleFeatureToggle = (feat: string) => {
    if (features.includes(feat)) {
      setFeatures(features.filter((f) => f !== feat));
    } else {
      setFeatures([...features, feat]);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer group"
          aria-label="Open AI Growth Widget"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out text-sm font-semibold pr-1">
                GrowBot AI
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[550px] bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm flex items-center gap-1.5">
                    GrowBot Assistant
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </h3>
                  <p className="text-[10px] text-slate-300">AI Powered Business Systems</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white p-1 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-100 bg-slate-50">
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  activeTab === "chat"
                    ? "bg-white border-b-2 border-blue-600 text-blue-600"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                AI Consultant
              </button>
              <button
                onClick={() => setActiveTab("calc")}
                className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  activeTab === "calc"
                    ? "bg-white border-b-2 border-blue-600 text-blue-600"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Calculator className="h-4 w-4" />
                Quote Calculator
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
              {activeTab === "chat" ? (
                /* Chat view */
                <div className="flex flex-col gap-4 min-h-full justify-between">
                  <div className="flex flex-col gap-3">
                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex flex-col max-w-[85%] ${
                          msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                        }`}
                      >
                        <div
                          className={`rounded-2xl p-3 text-sm leading-relaxed ${
                            msg.sender === "user"
                              ? "bg-blue-600 text-white rounded-br-none"
                              : "bg-white border border-slate-100 text-slate-800 rounded-bl-none shadow-xs"
                          }`}
                        >
                          {msg.text}
                        </div>
                        {msg.options && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {msg.options.map((opt, oi) => (
                              <button
                                key={oi}
                                onClick={() => handleOptionClick(opt.action, opt.label)}
                                className="bg-white hover:bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-full shadow-xs hover:border-blue-200 transition-all cursor-pointer"
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                </div>
              ) : (
                /* Quote Calculator view */
                <div className="flex flex-col gap-5 text-slate-700">
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                      Project Base Scope
                    </label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {[
                        { id: "website", label: "Marketing Site", price: "$2.5k" },
                        { id: "webapp", label: "Custom SaaS", price: "$5k" },
                        { id: "automation", label: "AI Workflows", price: "$3k" },
                        { id: "agent", label: "AI Agent", price: "$4k" },
                      ].map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setProjectType(type.id)}
                          className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                            projectType === type.id
                              ? "border-blue-600 bg-blue-50/50 shadow-xs"
                              : "border-slate-100 bg-white hover:border-slate-200"
                          }`}
                        >
                          <span className="text-xs font-bold text-slate-800">{type.label}</span>
                          <span className="text-xs text-blue-600 font-semibold">{type.price} base</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                      Scope Add-ons
                    </label>
                    <div className="flex flex-col gap-2 mt-2">
                      {[
                        { id: "auth", label: "Secure Accounts & Roles" },
                        { id: "stripe", label: "Payments & Subscription Sync" },
                        { id: "chatbot", label: "AI Customer Agent Integration" },
                        { id: "seo", label: "Premium Competitive SEO Setup" },
                      ].map((feat) => {
                        const active = features.includes(feat.id);
                        return (
                          <button
                            key={feat.id}
                            onClick={() => handleFeatureToggle(feat.id)}
                            className={`p-2 rounded-lg border text-left text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                              active
                                ? "border-blue-600 bg-blue-50/30 text-blue-800"
                                : "border-slate-100 bg-white hover:border-slate-200"
                            }`}
                          >
                            <span>{feat.label}</span>
                            <span className="text-blue-600 font-semibold">+$750</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Estimation summary */}
                  <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        Estimated Budget
                      </p>
                      <p className="text-2xl font-bold text-white">
                        {calculateTotal().toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        Timeline
                      </p>
                      <p className="text-sm font-semibold text-blue-400">
                        {projectType === "webapp" ? "6-8 Weeks" : "3-4 Weeks"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      window.location.href = `/contact?type=${projectType}&features=${features.join(
                        ","
                      )}&ref=growth-widget`;
                      setIsOpen(false);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    Lock In This Quote
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Input area for Chat tab */}
            {activeTab === "chat" && (
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 flex gap-2 bg-white">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 border border-slate-100 bg-slate-50 hover:bg-slate-100/50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 rounded-xl px-3 text-xs outline-none transition-all text-slate-800"
                />
                <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer">
                  <Send className="h-4.5 w-4.5" />
                </Button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
