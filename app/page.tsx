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
  "I've scheduled a free site survey for Thursday, 8 May at 10 AM with LightSpark Solar (4.5★ certified).\n\nI've also pre-filled your subsidy applications:\n• 30% Federal Solar Tax Credit\n• CA SGIP Battery Rebate: $1,150\n• Local Rooftop Credit: $300\n• 30% Federal Solar Tax Credit\n• CA SGIP Battery Rebate: $1,150\n• Local Rooftop Credit: $300\n\nAfter your site visit, I'll generate system designs, pricing, and savings estimates.\nWould you like to include battery storage for backup?",
  "Understood. I've included a 5 kWh battery. I'll also pull installer quotes for setups with backup prioritization.\n\nOnce your system is installed, I'll handle:\n• DER registration with the utility\n• Activation of net metering\n• Setup of flexibility opt-in via Residential Energy Agent\n• Permit sync with city and grid interconnection\nWould you like me to pre-enroll you in demand flexibility now?",
  "Got it. Your consent setting is now: Manual confirmation required for all flexibility events.\n\nI'll now finalize:\n• Subsidy paperwork\n• Notification to LightSpark for your free site survey\n• A timeline synced with permitting, utility review, and interconnection\nYou'll receive:\n• A dashboard to track each milestone\n• Notifications for key updates\n• Installer options with dynamic reconfiguration\nWould you like weekly check-ins or just major updates?",
  "Confirmed. I'll notify you next after your site survey. I'll also monitor for any new rebates or system upgrades relevant to your setup.\n\nWelcome to clean, intelligent energy.\nYour installation is now complete and verified. All system components—solar inverter, battery controller, and smart meter—have been registered.\n\n\nI've shared your DER profile with your utility's agent, so your system can now participate in flexibility programs.\nYou'll soon begin receiving notifications from the Residential Energy Agent whenever there's an opportunity to earn rewards by shifting your usage or supporting the grid.\nYou stay in control—every action will still require your approval.\nWould you like me to archive your onboarding journey and forward your data to your residential energy agent dashboard?",
  "All set. Your setup is now live across the DEG network.\nThanks for choosing Utility-Led Solarization Agent.\n\nYou've just taken the first step toward cleaner power—and smarter participation in the grid of the future."
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "agent",
      content:
        "Good morning! Based on your past 12 months of usage and roof geometry, you're an excellent candidate for rooftop solar + battery.\n\nWould you like me to prepare a personalized plan and begin coordination?",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [responseIndex, setResponseIndex] = useState(0); // Start from the first response
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isUppercase, setIsUppercase] = useState(true);
  const [isNumeric, setIsNumeric] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      <div className="flex-1 flex flex-col ">
        {/* Header */}
        <header className="bg-[#F9F9F9F0] text-[#007AFF] p-4 border-b flex items-center justify-between">
          <ChevronLeft className="h-6 w-6 mr-2" />
          <div className="flex items-center">
            <div className="flex items-center flex-col">
              <Image
                src="/AIBotAvatar.svg"
                alt="Solarization Agent"
                width={50}
                height={50}
                className="rounded-full mr-2"
              />
              <span className="text-[11px] mt-2 text-center font-['SF_Pro_Text'] font-normal leading-[13px] tracking-[0.066px] text-[#000]">Solarization Agent >

              </span>
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
            <div className=" flex items-center bg-white rounded-full border  px-3 py-2 justify-between w-[80vw] ">
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
