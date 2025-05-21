"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Camera, Mic, ChevronLeft, Video, Smile } from "lucide-react";
import Image from "next/image";

type Message = {
  id: string;
  content: string | React.ReactNode;
  sender: "user" | "agent";
  timestamp?: string;
};

// Predefined agent responses
const agentResponses = [
  "🙌 Great! You can contribute by temporarily turning off the following DERs (Distributed Energy Resources) in your home:\n\n1. **HVAC** – 3.5 kW\n2. **Washing Machine** – 1.8 kW\n3. **Dish Washer** – 1.2 kW\n\nWould you like to grant permission for us to remotely control and turn off these devices for a short period?",
  "✅ Thank you! We've successfully recorded your consent and notified the system operator.",
  "An update has been shared with the Utility Platform to reflect your participation."
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  const [inputValue, setInputValue] = useState("");
  const [responseIndex, setResponseIndex] = useState(0); // Start from the first response
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(true); // Start as true for initial typing
  const [isUppercase, setIsUppercase] = useState(true);
  const [isNumeric, setIsNumeric] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Show the first agent message after 10 seconds
    setIsTyping(true);
    const timer = setTimeout(() => {
      setMessages([
        {
          id: "1",
          sender: "agent",
          content:
            "⚠️ Attention! We have detected a grid overload in your area.\nTo help stabilize the grid, we are activating our **Demand Flexibility Program**.\nWould you like to participate?\n\n✅ **Incentives:** Earn $3–4.5 per kWh of reduced consumption\n✅ **Incentives:** 15% bonus if you maintain >90% participation this month.",
        },
      ]);
      setIsTyping(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user" as const,
      timestamp: `Read ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulate agent typing
    setIsTyping(true);

    // Send agent response after a delay
    setTimeout(() => {
      setIsTyping(false);

      if (responseIndex < agentResponses.length) {
        const agentMessage = {
          id: (Date.now() + 1).toString(),
          content: agentResponses[responseIndex],
          sender: "agent" as const,
        };

        setMessages((prev) => [...prev, agentMessage]);
        setResponseIndex((prev) => prev + 1);

        // If this was the "Thank you!" message, auto-send the final message after a delay
        if (responseIndex === 1 && agentResponses.length > 2) {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            const finalAgentMessage = {
              id: (Date.now() + 2).toString(),
              content: agentResponses[2],
              sender: "agent" as const,
            };
            setMessages((prev) => [...prev, finalAgentMessage]);
            setResponseIndex((prev) => prev + 1);
          }, 1500);
        }
      }
    }, 1500);
  };

  // Separate handler for shift (⇧)
  const handleShiftPress = () => {
    setIsUppercase((prev) => !prev);
  };

  // Separate handler for 123 (numeric toggle)
  const handleNumericPress = () => {
    setIsNumeric((prev) => !prev);
    setIsUppercase(true); // reset to uppercase when toggling
  };

  // Separate handler for clear (⌫)
  const handleClearPress = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  // Generic key press handler
  const handleKeyPress = (key: string) => {
    if (key === "return") {
      handleSendMessage();
    } else if (key === "⌫") {
      handleClearPress();
    } else if (key === "space") {
      setInputValue((prev) => prev + " ");
    } else if (key === "123") {
      handleNumericPress();
    } else if (key === "⇧") {
      handleShiftPress();
    } else {
      setInputValue((prev) => prev + key);
    }
  };

  // Keyboard layouts
  const letterRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];
  const numberRows = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["@", "#", "$", "_", "&", "-", "+", "(", ")", "/"],
    ["*", '"', "'", ":", ";", "!", "?"],
  ];

  return (
    <div className="flex h-screen ">
      {/* Left sidebar */}
      {/* <div className="w-2 md:w-16 bg-blue-900 border-r border-blue-800"></div> */}

      {/* Main chat area */}
      <div className="flex-1 flex flex-col " style={{maxWidth: '480px', margin: ' 0 auto'}}>
        {/* Header */}
        <header className="bg-[#F9F9F9F0] text-[#007AFF] p-4 border-b flex items-center justify-between">
          <ChevronLeft className="h-6 w-6 mr-2" />
          <div className="flex items-center">
            <div className="flex items-center flex-col">
              <Image
                src="/AIBotAvatar.svg"
                alt="Consumer Agent"
                width={50}
                height={50}
                className="rounded-full mr-2"
              />
              <span className="text-[11px] mt-2 text-center font-['SF_Pro_Text'] font-normal leading-[13px] tracking-[0.066px] text-[#000]">Consumer Agent {'>'}</span>
            </div>
          </div>
          <Video className="h-6 w-6" />
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#fff]">
          <div className="max-w-3xl mx-auto space-y-3">
            {messages.map((message) => (
              <div key={message.id} className="flex flex-col">
                <div
                  className={`rounded-2xl p-3 max-w-[85%] ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white self-end"
                      : "bg-gray-100 text-gray-800 self-start"
                  }`}
                  style={message.sender === "agent" ? { whiteSpace: 'pre-line' } : {}}
                >
                  {message.content}
                </div>
                {message.timestamp && (
                  <span
                    className={`text-xs text-gray-500 mt-1 ${
                      message.sender === "user"
                        ? "self-end mr-1"
                        : "self-start ml-1"
                    }`}
                  >
                    {message.timestamp}
                  </span>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col">
                <div className="bg-gray-100 text-gray-800 rounded-2xl p-3 max-w-[85%] self-start">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <form
          onSubmit={handleSendMessage}
          className="flex items-center p-2 bg-gray-100 justify-between"
          style={{width: '100%'}}
        >
          <div className="flex items-center mb-2 mr-4 ml-4">
            <Image
              src={"/Camera.svg"}
              alt="Solarization Agent"
              width={38}
              height={32}
              className="mr-2"
            />
            <Image
              src={"/Apps.svg"}
              alt="Solarization Agent"
              width={38}
              height={32}
              className="mr-2"
            />
            <div className=" flex items-center bg-white rounded-full border  px-3 py-2 justify-between w-[100%]">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="iMessage"
                className="flex-1 outline-none bg-transparent"
              />
              <Mic className="h-5 w-5 text-gray-500 ml-2" />
            </div>
          </div>
        </form>
        <div className="bg-gray-100 border-t border-gray-300">
          {/* App shortcuts */}
          <div className="flex justify-around py-2 px-4 border-b border-gray-300">
            {[
              "/App0.svg",
              "/App-1.svg",
              "/App-2.svg",
              "/App-3.svg",
              "/App-4.svg",
              "/App-5.svg",
              "/App-6.svg",
            ].map((emoji, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
              >
                <Image
                  src={emoji}
                  alt="Solarization Agent"
                  width={32}
                  height={32}
                />
              </div>
            ))}
          </div>

          {/* Keyboard */}
          <div className="bg-gray-200">
            {/* First row */}
            <div className="flex justify-around py-1 keyword">
              {isNumeric
                ? numberRows[0].map((key) => (
                    <button
                      key={key}
                      onClick={() => handleKeyPress(key)}
                      className="w-8 h-10 bg-white rounded-lg shadow flex items-center justify-center m-0.5 active:bg-gray-300"
                    >
                      {key}
                    </button>
                  ))
                : letterRows[0].map((key) => (
                    <button
                      key={key}
                      onClick={() => handleKeyPress(isUppercase ? key : key.toLowerCase())}
                      className="w-8 h-10 bg-white rounded-lg shadow flex items-center justify-center m-0.5 active:bg-gray-300"
                    >
                      {isUppercase ? key : key.toLowerCase()}
                    </button>
                  ))}
            </div>

            {/* Second row */}
            <div className="flex justify-around py-1 keyword">
              {isNumeric
                ? numberRows[1].map((key) => (
                    <button
                      key={key}
                      onClick={() => handleKeyPress(key)}
                      className="w-8 h-10 bg-white rounded-lg shadow flex items-center justify-center m-0.5 active:bg-gray-300"
                    >
                      {key}
                    </button>
                  ))
                : letterRows[1].map((key) => (
                    <button
                      key={key}
                      onClick={() => handleKeyPress(isUppercase ? key : key.toLowerCase())}
                      className="w-8 h-10 bg-white rounded-lg shadow flex items-center justify-center m-0.5 active:bg-gray-300"
                    >
                      {isUppercase ? key : key.toLowerCase()}
                    </button>
                  ))}
            </div>

            {/* Third row */}
            <div className="flex justify-around py-1 keyword">
              {isNumeric ? (
                <>
                  <button
                    onClick={handleNumericPress}
                    className="w-8 h-10 bg-gray-300 rounded-lg shadow flex items-center justify-center m-0.5 active:bg-gray-400"
                  >
                    ABC
                  </button>
                  {numberRows[2].map((key) => (
                    <button
                      key={key}
                      onClick={() => handleKeyPress(key)}
                      className="w-8 h-10 bg-white rounded-lg shadow flex items-center justify-center m-0.5 active:bg-gray-300"
                    >
                      {key}
                    </button>
                  ))}
                  <button
                    onClick={handleClearPress}
                    className="w-8 h-10 bg-gray-300 rounded-lg shadow flex items-center justify-center m-0.5 active:bg-gray-400"
                  >
                    ⌫
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleShiftPress}
                    className="w-8 h-10 bg-gray-300 rounded-lg shadow flex items-center justify-center m-0.5 active:bg-gray-400"
                  >
                    ⇧
                  </button>
                  {letterRows[2].map((key) => (
                    <button
                      key={key}
                      onClick={() => handleKeyPress(isUppercase ? key : key.toLowerCase())}
                      className="w-8 h-10 bg-white rounded-lg shadow flex items-center justify-center m-0.5 active:bg-gray-300"
                    >
                      {isUppercase ? key : key.toLowerCase()}
                    </button>
                  ))}
                  <button
                    onClick={handleClearPress}
                    className="w-8 h-10 bg-gray-300 rounded-lg shadow flex items-center justify-center m-0.5 active:bg-gray-400"
                  >
                    ⌫
                  </button>
                </>
              )}
            </div>

            {/* Fourth row */}
            <div className="flex justify-around py-1 keyword">
              <button
                onClick={handleNumericPress}
                className="w-16 h-10 bg-gray-300 rounded-lg shadow flex items-center justify-center m-0.5 active:bg-gray-400"
              >
                {isNumeric ? "ABC" : "123"}
              </button>
              <button
                onClick={() => handleKeyPress("space")}
                className="flex-1 h-10 bg-white rounded-lg shadow flex items-center justify-center mx-1 my-0.5 active:bg-gray-300"
              >
                space
              </button>
              <button
                onClick={() => handleKeyPress("return")}
                className="w-16 h-10 bg-gray-300 rounded-lg shadow flex items-center justify-center m-0.5 active:bg-gray-400"
              >
                return
              </button>
            </div>
          </div>

          {/* Message input */}
          <div className="flex items-center p-2 bg-gray-100 justify-between">
            <Smile className="h-6 w-6 text-gray-500 mx-2" />

            <button type="submit" className="focus:outline-none">
              <Mic className="h-6 w-6 text-gray-500 mx-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
