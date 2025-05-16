"use client";
import { useState } from "react";
import { GiRadioTower } from "react-icons/gi";
import { SlEnergy } from "react-icons/sl";
import { IoHomeOutline } from "react-icons/io5";
import { PiCarBatteryDuotone } from "react-icons/pi";
import Image from "next/image";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("feeder"); // 'feeder' or 'audit'

  // Tab options for the map filter
  const tabOptions = [
    { key: "all", label: "All" },
    {
      key: "substations",
      label: "Substations",
      icon: <GiRadioTower size={20} />,
    },
    { key: "feeders", label: "Feeders", icon: <SlEnergy size={20} /> },
    {
      key: "households",
      label: "Households",
      icon: <IoHomeOutline size={20} />,
    },
    { key: "ders", label: "DER's", icon: <PiCarBatteryDuotone size={20} /> },
  ];
  const [activeMapTab, setActiveMapTab] = useState("all");

  // Feeder Summary UI
  const FeederSummary = (
    <div className="flex flex-col gap-3">
      <div className="bg-[#7B8187] rounded-lg p-4 left-card">
        <div className="text-white font-semibold text-base">
          Central Feeder Hub
        </div>
        <div className="flex justify-between text-xs text-gray-200 mt-1">
          <span>Region</span>
          <span>Central</span>
        </div>
        <div className="flex justify-between text-xs text-gray-200">
          <span>Current load</span>
          <span>92 %</span>
        </div>
        <div className="flex justify-between text-xs text-gray-200">
          <span>Status</span>
          <span className="bg-[#8B3A3A] text-white px-2 py-0.5 rounded">
            Critical
          </span>
        </div>
      </div>
      <div className="bg-[#7B8187] rounded-lg p-4 left-card">
        <div className="text-white font-semibold text-base">
          SoMA District Feeder
        </div>
        <div className="flex justify-between text-xs text-gray-200 mt-1">
          <span>Region</span>
          <span>North</span>
        </div>
        <div className="flex justify-between text-xs text-gray-200">
          <span>Current Load</span>
          <span>70 %</span>
        </div>
        <div className="flex justify-between text-xs text-gray-200">
          <span>Status</span>
          <span className="bg-[#F4B740] text-white px-2 py-0.5 rounded">
            Warning
          </span>
        </div>
      </div>
      <div className="bg-[#7B8187] rounded-lg p-4 left-card">
        <div className="text-white font-semibold text-base">
          Mission District Feeder
        </div>
        <div className="flex justify-between text-xs text-gray-200 mt-1">
          <span>Region</span>
          <span>West</span>
        </div>
        <div className="flex justify-between text-xs text-gray-200">
          <span>Current Load</span>
          <span>80 %</span>
        </div>
        <div className="flex justify-between text-xs text-gray-200">
          <span>Status</span>
          <span className="bg-[#F4B740] text-white px-2 py-0.5 rounded">
            Warning
          </span>
        </div>
      </div>
      <div className="bg-[#7B8187] rounded-lg p-4 left-card">
        <div className="text-white font-semibold text-base">
          Marina District Feeder
        </div>
        <div className="flex justify-between text-xs text-gray-200 mt-1">
          <span>Region</span>
          <span>East</span>
        </div>
        <div className="flex justify-between text-xs text-gray-200">
          <span>Current Load</span>
          <span>50 %</span>
        </div>
        <div className="flex justify-between text-xs text-gray-200">
          <span>Status</span>
          <span className="bg-[#4CAF50] text-white px-2 py-0.5 rounded">
            Normal
          </span>
        </div>
      </div>
      <div className="bg-[#7B8187] rounded-lg p-4 left-card">
        <div className="text-white font-semibold text-base">
          Sunset District Feeder
        </div>
        <div className="flex justify-between text-xs text-gray-200 mt-1">
          <span>Region</span>
          <span>Centre</span>
        </div>
        <div className="flex justify-between text-xs text-gray-200">
          <span>Current Load</span>
          <span>30 %</span>
        </div>
        <div className="flex justify-between text-xs text-gray-200">
          <span>Status</span>
          <span className="bg-[#4CAF50] text-white px-2 py-0.5 rounded">
            Normal
          </span>
        </div>
      </div>
    </div>
  );

  // Audit Trail UI
  const AuditTrail = (
    <div className="flex flex-col gap-3">
      <div className="bg-[#384B7A] rounded-lg p-4 left-card">
        <div className="flex justify-between items-center">
          <div className="text-white font-semibold text-base">
            Central Feeder Hub
          </div>
          <div className="text-xs text-gray-200">04:46 PM</div>
        </div>
        <div className="flex justify-between text-xs text-blue-200 mt-1">
          <span>Active (Fallback)</span>
          <span className="bg-[#2B3A5A] text-white px-2 py-0.5 rounded">
            Tier 2
          </span>
        </div>
        <div className="flex justify-between text-xs text-gray-200 mt-1">
          <span>Load Reduction</span>
          <span>15%</span>
        </div>
        <div className="flex justify-between text-xs text-gray-200">
          <span>Duration</span>
          <span>60 min</span>
        </div>
      </div>
      <div className="bg-[#8A7A3A] rounded-lg p-4 left-card">
        <div className="flex justify-between items-center">
          <div className="text-white font-semibold text-base">
            SoMA District Feeder
          </div>
          <div className="text-xs text-gray-200">04:46 PM</div>
        </div>
        <div className="flex justify-between text-xs text-yellow-200 mt-1">
          <span>Pending</span>
          <span className="bg-[#6B5A2A] text-white px-2 py-0.5 rounded">
            Tier 2
          </span>
        </div>
        <div className="flex justify-between text-xs text-gray-200 mt-1">
          <span>Load Reduction</span>
          <span>10%</span>
        </div>
        <div className="flex justify-between text-xs text-gray-200">
          <span>Duration</span>
          <span>30 min</span>
        </div>
      </div>
      <div className="bg-[#8A7A3A] rounded-lg p-4 left-card">
        <div className="flex justify-between items-center">
          <div className="text-white font-semibold text-base">
            Mission District Feeder
          </div>
          <div className="text-xs text-gray-200">04:46 PM</div>
        </div>
        <div className="flex justify-between text-xs text-yellow-200 mt-1">
          <span>Pending</span>
          <span className="bg-[#6B5A2A] text-white px-2 py-0.5 rounded">
            Tier 2
          </span>
        </div>
        <div className="flex justify-between text-xs text-gray-200 mt-1">
          <span>Load Reduction</span>
          <span>10%</span>
        </div>
        <div className="flex justify-between text-xs text-gray-200">
          <span>Duration</span>
          <span>30 min</span>
        </div>
      </div>
      <div className="bg-[#4A7A3A] rounded-lg p-4 left-card">
        <div className="flex justify-between items-center">
          <div className="text-white font-semibold text-base">
            Mission District Feeder
          </div>
          <div className="text-xs text-gray-200">04:46 PM</div>
        </div>
        <div className="flex justify-between text-xs text-green-200 mt-1">
          <span>Completed</span>
          <span className="bg-[#2A5A3A] text-white px-2 py-0.5 rounded">
            Tier 2
          </span>
        </div>
        <div className="flex justify-between text-xs text-gray-200 mt-1">
          <span>Load Reduction</span>
          <span>10%</span>
        </div>
        <div className="flex justify-between text-xs text-gray-200">
          <span>Duration</span>
          <span>30 min</span>
        </div>
      </div>
      <div className="bg-[#4A7A3A] rounded-lg p-4 left-card">
        <div className="flex justify-between items-center">
          <div className="text-white font-semibold text-base">
            Sunset District Feeder
          </div>
          <div className="text-xs text-gray-200">04:46 PM</div>
        </div>
        <div className="flex justify-between text-xs text-green-200 mt-1">
          <span>Completed</span>
          <span className="bg-[#2A5A3A] text-white px-2 py-0.5 rounded">
            Tier 2
          </span>
        </div>
        <div className="flex justify-between text-xs text-gray-200 mt-1">
          <span>Load Reduction</span>
          <span>10%</span>
        </div>
        <div className="flex justify-between text-xs text-gray-200">
          <span>Duration</span>
          <span>30 min</span>
        </div>
      </div>
    </div>
  );

  // Login Page UI
  const LoginPage = (
    <div className="flex items-center justify-center min-h-screen bg-[#2E343A]">
      <div className="bg-[#7B8187] bg-opacity-80 rounded-2xl border border-gray-300 shadow-lg p-10 w-full max-w-md flex flex-col items-center left-card">
        <div className="mb-6 flex flex-col items-center">
          <div className="bg-white bg-opacity-10 rounded-full p-4 mb-2">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2
            className="text-white text-center"
            style={{ fontSize: "18px", fontWeight: 700 }}
          >
            Utility
            <br />
            Administration Portal
          </h2>
        </div>
        <form className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label
              className="text-white mb-1 ml-2"
              htmlFor="email"
              style={{ fontSize: "12px", fontWeight: 500 }}
            >
              Email ID
            </label>
            <input
              id="email"
              type="email"
              placeholder=""
              className="w-full rounded-2xl border-2 border-gray-200 bg-transparent text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold placeholder-white placeholder:font-bold placeholder:text-2xl"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="text-white mb-1 ml-2"
              htmlFor="password"
              style={{ fontSize: "12px", fontWeight: 500 }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder=""
              className="w-full rounded-2xl border-2 border-gray-200 bg-transparent text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold placeholder-white placeholder:font-bold placeholder:text-2xl"
            />
            <div className="flex justify-end mt-1">
              <button
                type="button"
                className="text-sm text-gray-200 hover:underline font-semibold"
              >
                Forgot Password?
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsLoggedIn(true)}
            className="w-full mt-2 bg-gray-200 text-white py-3 rounded-2xl font-semibold text-sm hover:bg-gray-300 border-2 border-gray-200"
          >
            Sign In
          </button>
          <button
            type="button"
            className="w-full border-2 border-gray-200 text-white py-3 rounded-2xl font-semibold text-sm mt-2 bg-transparent hover:bg-gray-100 hover:text-gray-700 transition"
          >
            New User? Sign Up
          </button>
        </form>
      </div>
    </div>
  );

  // Dashboard Page UI
  const DashboardPage = (
    <div className="min-h-screen bg-[#2E343A] flex flex-col">
      {/* Header with hamburger */}
      <header className="bg-[#454B52] flex items-center px-8 py-4 justify-between">
        <div className="flex items-center gap-4">
          {/* Hamburger menu */}
          <button className="focus:outline-none">
            <svg
              width="28"
              height="28"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth="2"
            >
              <line
                x1="4"
                y1="7"
                x2="20"
                y2="7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="4"
                y1="12"
                x2="20"
                y2="12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="4"
                y1="17"
                x2="20"
                y2="17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="text-white text-lg font-semibold">
            Utility Admin Dashboard
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-300 flex items-center justify-center">
            <span role="img" aria-label="avatar">
              👤
            </span>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-row items-start justify-center p-8 gap-6">
        {/* Left Panel with Tabs */}
        <div className="w-[320px] bg-[#454B52] bg-opacity-80 rounded-xl p-4 flex flex-col gap-2 min-w-[270px] h-[calc(100vh-120px)]">
          <div className="flex gap-2 mb-2">
            <button
              className={`px-3 py-1 rounded text-xs font-semibold ${
                activeTab === "feeder"
                  ? "bg-blue-600 text-white"
                  : "bg-[#454B52] text-white"
              }`}
              onClick={() => setActiveTab("feeder")}
            >
              Feeder Summary
            </button>
            <button
              className={`px-3 py-1 rounded text-xs font-semibold ${
                activeTab === "audit"
                  ? "bg-blue-600 text-white"
                  : "bg-[#454B52] text-white"
              }`}
              onClick={() => setActiveTab("audit")}
            >
              Audit Trail
            </button>
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-180px)] pr-1">
            {activeTab === "feeder" ? FeederSummary : AuditTrail}
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Top Cards */}
          <div className="grid grid-cols-3 gap-6">
            {/* DER Utilization Card */}
            <div
              className="bg-[#7B8187] rounded-lg p-6 min-w-[217px] flex flex-col justify-center items-center left-card"
              style={{ height: "217px" }}
            >
              <div
                className="text-white font-bold w-full mb-2"
                style={{ fontSize: "12px", fontWeight: 700, textAlign: "left" }}
              >
                DER Utilization
              </div>
              <div className="flex-1 flex flex-col justify-center items-center w-full">
                <div className="flex items-center justify-center w-full h-full">
                  <Image src="/progress.svg" width={100} height={100} />
                </div>
                <div className="flex flex-col gap-1 mt-2 w-full">
                  <div className="flex justify-between items-center w-full">
                    <span
                      className="text-white"
                      style={{ fontSize: "12px", fontWeight: 700 }}
                    >
                      Current
                    </span>
                    <span
                      className="text-white"
                      style={{ fontSize: "12px", fontWeight: 700 }}
                    >
                      50 %
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span
                      className="text-white"
                      style={{ fontSize: "12px", fontWeight: 700 }}
                    >
                      Available
                    </span>
                    <span
                      className="text-white"
                      style={{ fontSize: "12px", fontWeight: 700 }}
                    >
                      93 %
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span
                      className="text-white"
                      style={{ fontSize: "12px", fontWeight: 700 }}
                    >
                      Total
                    </span>
                    <span
                      className="text-white"
                      style={{ fontSize: "12px", fontWeight: 700 }}
                    >
                      100 %
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* System Load Card */}
            <div
              className="bg-[#7B8187] rounded-lg p-6 min-w-[217px] flex flex-col justify-center items-center left-card"
              style={{ height: "217px" }}
            >
              <div
                className="text-white font-bold w-full mb-2"
                style={{ fontSize: "12px", fontWeight: 700, textAlign: "left" }}
              >
                System Load
              </div>
              <div className="flex-1 flex flex-col justify-center items-center w-full">
                <div className="flex items-center justify-center w-full h-full">
                  <Image src="/progress-1.svg" width={100} height={100} />
                </div>
                <div className="flex flex-col gap-1 mt-2 w-full">
                  <div className="flex justify-between items-center w-full">
                    <span
                      className="text-white"
                      style={{ fontSize: "12px", fontWeight: 700 }}
                    >
                      Current
                    </span>
                    <span
                      className="text-white"
                      style={{ fontSize: "12px", fontWeight: 700 }}
                    >
                      50 %
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span
                      className="text-white"
                      style={{ fontSize: "12px", fontWeight: 700 }}
                    >
                      Peak
                    </span>
                    <span
                      className="text-white"
                      style={{ fontSize: "12px", fontWeight: 700 }}
                    >
                      93 %
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Mitigation Events Card */}
            <div
              className="bg-[#7B8187] rounded-lg p-6 min-w-[217px] flex flex-col justify-center items-center left-card"
              style={{ height: "217px" }}
            >
              <div
                className="text-white font-bold w-full mb-2"
                style={{ fontSize: "12px", fontWeight: 700, textAlign: "left" }}
              >
                Mitigation Events
              </div>
              <div className="flex-1 flex flex-col justify-center items-center w-full">
                <div className="flex items-center justify-center w-full h-full">
                  <div className="w-full h-20 flex items-end justify-center gap-2">
                    {/* Simple bar chart mockup */}
                    {/* {[6, 9, 7, 10, 5, 8, 4].map((h, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div
                          className="bg-blue-400 w-4"
                          style={{ height: `${h * 6}px` }}
                        ></div>
                        <div
                          className="bg-orange-400 w-4"
                          style={{ height: `${(12 - h) * 2}px` }}
                        ></div>
                      </div>
                    ))} */}
                    <Image src="/progress-2.svg" width={160} height={160} />
                  </div>
                </div>
                <div
                  className="grid grid-cols-2 grid-rows-2 gap-y-2 mt-2 w-full"
                  style={{ fontSize: "12px", fontWeight: 700 }}
                >
                  <span className="text-white text-left">Total 12</span>
                  <span className="text-white text-left">Success 09</span>
                  <span className="text-white text-left">Fallback 02</span>
                  <span className="text-white text-left">Failed 02</span>
                </div>
              </div>
            </div>
          </div>
          {/* Map and Filters */}
          <div
            className="w-full bg-[#7B8187] bg-opacity-80 rounded-xl p-4 mt-2"
            style={{ height: "59vh" }}
          >
            <div className="flex items-center gap-4 justify-between mb-4">
              <select className="bg-[#454B52] text-white rounded-2xl px-5 py-2 text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option>Stanford University</option>
              </select>
              <div className="flex gap-3">
                {tabOptions.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveMapTab(tab.key)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-2xl font-semibold text-base transition border border-gray-300 focus:outline-none ${
                      activeMapTab === tab.key
                        ? "bg-blue-600 text-white border-blue-600 shadow"
                        : "bg-white text-[#222] hover:bg-gray-100"
                    }`}
                  >
                    {tab.icon && <span>{tab.icon}</span>}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full h-80 bg-[#454B52] rounded-xl relative">
              {/* Map mockup with icons */}
              <div className="absolute left-1/4 top-1/4">
                <span className="text-green-400 text-3xl">⚡</span>
              </div>
              <div className="absolute left-1/2 top-1/3">
                <span className="text-yellow-400 text-3xl">🛤️</span>
              </div>
              <div className="absolute left-1/3 top-2/3">
                <span className="text-blue-400 text-3xl">🏠</span>
              </div>
              <div className="absolute left-2/3 top-1/2">
                <span className="text-green-400 text-3xl">⚡</span>
              </div>
              <div className="absolute left-1/2 top-2/3">
                <span className="text-yellow-400 text-3xl">🛤️</span>
              </div>
              <div className="absolute left-1/3 top-1/3">
                <span className="text-blue-400 text-3xl">🏠</span>
              </div>
            </div>
          </div>
          {/* Utility Agent */}
          <div className="w-full flex justify-end mt-4">
            <div className="bg-[#454B52] rounded-full px-4 py-2 flex items-center gap-2 text-white">
              <span className="bg-blue-400 rounded-full w-8 h-8 flex items-center justify-center">
                🤖
              </span>
              Utility Agent
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  return isLoggedIn ? DashboardPage : LoginPage;
}
