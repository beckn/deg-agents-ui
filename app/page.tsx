"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Camera, Mic, ChevronLeft, Video, Smile } from "lucide-react";
import Image from "next/image";
import { webhookCache } from '@/app/utils/cache'

type Message = {
  id: string;
  content: string | React.ReactNode;
  sender: "user" | "agent";
  timestamp?: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [clientId, setClientId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isUppercase, setIsUppercase] = useState(true);
  const [isNumeric, setIsNumeric] = useState(false);
  const [hasShownMessages, setHasShownMessages] = useState(false);
  
  // WebSocket related state
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [authState, setAuthState] = useState<'initial' | 'meter_id_required' | 'otp_required' | 'authenticated'>('initial');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const checkWebhookData = async () => {
      if (hasShownMessages) return;
      
      const cachedData = webhookCache.getAll();
      
      if (cachedData && cachedData.length > 0) {
        const systemMessages: Message[] = [
          {
            id: `system-1-${Date.now()}`,
            content: "Your household is consuming more energy",
            sender: "agent",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
          {
            id: `system-2-${Date.now() + 1}`,
            content: "Since you are registered to the DFP program, we have subscribed you for the updates",
            sender: "agent",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }
        ];

        setMessages(prev => [...prev, ...systemMessages]);
        setHasShownMessages(true);
      }
    };

    checkWebhookData();
  }, [hasShownMessages]);

  // WebSocket connection setup
  useEffect(() => {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!);
    
    socket.onopen = () => {
      console.log('WebSocket Connected');
      setWs(socket);
      setAuthState('meter_id_required');
      
      // Add a system message to prompt for meter ID
      const systemMessage = {
        id: `system-auth-${Date.now()}`,
        content: "Please enter your meter ID to begin",
        sender: "agent" as const,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages(prev => [...prev, systemMessage]);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleWebSocketMessage(data);
    };

    socket.onclose = () => {
      console.log('WebSocket Disconnected');
      setWs(null);
      setAuthState('initial');
      
      // Add a system message about disconnection
      const systemMessage = {
        id: `system-disconnect-${Date.now()}`,
        content: "Connection lost. Please refresh the page to reconnect.",
        sender: "agent" as const,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages(prev => [...prev, systemMessage]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
      
      // Add a system message about error
      const systemMessage = {
        id: `system-error-${Date.now()}`,
        content: "Connection error. Please check your internet connection and try again.",
        sender: "agent" as const,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages(prev => [...prev, systemMessage]);
    };

    return () => {
      socket.close();
    };
  }, []);

  // Handler for WebSocket messages
  const handleWebSocketMessage = (data: any) => {
    // Turn typing indicator ON when server is processing
    if (data.status === 'processing') {
      setIsTyping(true);
      return; // Don't add a message for processing status
    }
    
    // Turn typing indicator OFF for all other message types
    setIsTyping(false);
    
    if (data.status === 'auth_required') {
      setAuthState(data.auth_state);
      
      // Set client ID from response if available
      if (data.client_id && !clientId) {
        setClientId(data.client_id);
      }
      
      const promptMessage = {
        id: `auth-prompt-${Date.now()}`,
        content: data.message || (data.auth_state === 'otp_required' ? 
          "Please enter the 6-digit OTP sent to your registered device" : 
          "Please enter your meter ID"),
        sender: "agent" as const,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages(prev => [...prev, promptMessage]);
      
    } else if (data.status === 'auth_success') {
      setToken(data.token);
      setAuthState('authenticated');
      
      const successMessage = {
        id: `auth-success-${Date.now()}`,
        content: data.message || "Authentication successful. You can now chat with the agent.",
        sender: "agent" as const,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages(prev => [...prev, successMessage]);
      
    } else if (data.status === 'auth_failed') {
      const failureMessage = {
        id: `auth-failed-${Date.now()}`,
        content: data.message || "Authentication failed. Please try again.",
        sender: "agent" as const,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages(prev => [...prev, failureMessage]);
      
    } else if (data.status === 'success') {
      const agentMessage = {
        id: `agent-${Date.now()}`,
        content: data.message,
        sender: "agent" as const,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages(prev => [...prev, agentMessage]);
      
    } else if (data.status === 'error') {
      const errorMessage = {
        id: `error-${Date.now()}`,
        content: data.message || "An error occurred. Please try again.",
        sender: "agent" as const,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      const errorMessage = {
        id: `connection-error-${Date.now()}`,
        content: "Connection not available. Please refresh the page.",
        sender: "agent" as const,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    // Create and send user message
    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user" as const,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Prepare WebSocket message
    const message = {
      client_id: clientId || inputValue, // Use input as client_id if not set yet
      query: inputValue
    };
    
    // If this is the first message and we're in meter_id_required state,
    // set the client ID from the input
    if (authState === 'meter_id_required' && !clientId) {
      setClientId(inputValue);
    }
    
    setInputValue("");
    
    // Don't set typing indicator here - wait for processing status from server
    // setIsTyping(true); - removed
    
    // Send message to WebSocket
    ws.send(JSON.stringify(message));
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
          <div className="flex items-center flex-grow">
            <div className="flex items-center flex-col mr-4">
              <Image
                src="/AIBotAvatar.svg"
                alt="Solarization Agent"
                width={50}
                height={50}
                className="rounded-full mr-2"
              />
              <span className="text-[11px] mt-2 text-center font-['SF_Pro_Text'] font-normal leading-[13px] tracking-[0.066px] text-[#000]">
                Consumer Agent &gt;
              </span>
            </div>
            
          </div>
          <Video className="h-6 w-6 ml-2" />
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
                  style={
                    message.sender === "agent" ? { whiteSpace: "pre-line" } : {}
                  }
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
                      onClick={() =>
                        handleKeyPress(isUppercase ? key : key.toLowerCase())
                      }
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
                      onClick={() =>
                        handleKeyPress(isUppercase ? key : key.toLowerCase())
                      }
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
                      onClick={() =>
                        handleKeyPress(isUppercase ? key : key.toLowerCase())
                      }
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
