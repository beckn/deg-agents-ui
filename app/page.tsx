"use client";
import { useState } from "react";
import { GiRadioTower } from "react-icons/gi";
import { SlEnergy } from "react-icons/sl";
import { IoHomeOutline } from "react-icons/io5";
import { PiCarBatteryDuotone } from "react-icons/pi";
import Image from "next/image";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("feeder"); // 'feeder' or 'audit'
  const [showPopover, setShowPopover] = useState(false);

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

  // Google Maps API loader
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDj_jBuujsEk8mkIva0xG6_H73oJEytXEA",
  });

  // Login form state and handlers (moved above LoginPage)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleSignIn() {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Enter a valid email");
      valid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }
    if (valid) {
      setIsLoggedIn(true);
    }
  }

  // Login Page UI
  const LoginPage = (
    <div className="flex items-center justify-center min-h-screen bg-[#2E343A]">
      <div className="bg-[#7B8187] bg-opacity-80 border border-gray-300 shadow-lg p-10 w-full max-w-md flex flex-col items-center left-card" style={{borderRadius: "23px !important"}}>
        <div className="mb-6 flex flex-col items-center">
          <div className="bg-white bg-opacity-10 rounded-full p-4 mb-2">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_1">
                <path
                  id="Vector"
                  d="M20.92 54.8899C21.06 54.9599 21.22 54.9999 21.37 54.9999C21.67 54.9999 21.97 54.8599 22.16 54.6099L44.63 25.6099C44.86 25.3099 44.91 24.8999 44.74 24.5599C44.57 24.2199 44.22 23.9999 43.84 23.9999H34.65L39.36 6.24991C39.48 5.78991 39.26 5.29991 38.83 5.08991C38.4 4.87991 37.88 4.99991 37.59 5.37991L15.36 34.7199C15.13 35.0199 15.09 35.4299 15.26 35.7699C15.43 36.1099 15.78 36.3299 16.16 36.3299H25.33L20.4 53.7299C20.27 54.1899 20.49 54.6799 20.92 54.8899ZM27.62 35.5999C27.71 35.2999 27.64 34.9699 27.46 34.7199C27.27 34.4699 26.98 34.3199 26.66 34.3199H18.18L36.12 10.6399L32.38 24.7399C32.3 25.0399 32.37 25.3599 32.55 25.6099C32.74 25.8599 33.03 25.9999 33.34 25.9999H41.79L23.73 49.3099L27.62 35.5999Z"
                  fill="white"
                  stroke="white"
                  stroke-width="0.7"
                />
                <path
                  id="Vector_2"
                  d="M28.68 52.0202C29.12 52.0502 29.56 52.0602 30 52.0602C42.16 52.0602 52.06 42.1602 52.06 30.0002C52.06 22.2302 48.1 15.1802 41.45 11.1402C40.98 10.8502 40.36 11.0002 40.08 11.4702C39.79 11.9402 39.94 12.5602 40.41 12.8402C46.45 16.5202 50.06 22.9302 50.06 29.9902C50.06 41.0502 41.06 50.0502 30 50.0502C29.59 50.0502 29.19 50.0401 28.79 50.0102C28.22 49.9902 27.76 50.4002 27.73 50.9502C27.7 51.5202 28.13 51.9902 28.68 52.0202Z"
                  fill="white"
                  stroke="white"
                  stroke-width="0.7"
                />
                <path
                  id="Vector_3"
                  d="M18.4 48.7704C18.56 48.8704 18.75 48.9204 18.93 48.9204C19.26 48.9204 19.59 48.7504 19.78 48.4504C20.07 47.9804 19.93 47.3604 19.46 47.0704C13.5 43.3804 9.94 37.0004 9.94 30.0004C9.94 18.9404 18.94 9.94043 30 9.94043C30.36 9.94043 30.71 9.95043 31.06 9.97043C31.61 10.0004 32.08 9.58043 32.11 9.02043C32.14 8.47043 31.72 8.00043 31.16 7.97043C30.78 7.95043 30.39 7.94043 30 7.94043C17.84 7.94043 7.94 17.8404 7.94 30.0004C7.94 37.7004 11.85 44.7104 18.4 48.7704Z"
                  fill="white"
                  stroke="white"
                  stroke-width="0.7"
                />
              </g>
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
        <form
          className="w-full flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn();
          }}
        >
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-2xl border-2 bg-transparent text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold placeholder-white placeholder:font-bold placeholder:text-2xl ${
                emailError ? "border-red-500" : "border-gray-200"
              }`}
            />
            {emailError && (
              <span className="text-red-500 text-xs mt-1 ml-2">
                {emailError}
              </span>
            )}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded-2xl border-2 bg-transparent text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold placeholder-white placeholder:font-bold placeholder:text-2xl ${
                passwordError ? "border-red-500" : "border-gray-200"
              }`}
            />
            {passwordError && (
              <span className="text-red-500 text-xs mt-1 ml-2">
                {passwordError}
              </span>
            )}
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
            type="submit"
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

  // Marker data for the map (example coordinates for Stanford area)
  const markers = [
    { type: "feeder", lat: 37.4275, lng: -122.1697, icon: "⚡" },
    { type: "households", lat: 37.428, lng: -122.17, icon: "🏠" },
    { type: "substations", lat: 37.429, lng: -122.168, icon: "🗼" },
    { type: "feeder", lat: 37.426, lng: -122.17, icon: "⚡" },
    { type: "households", lat: 37.427, lng: -122.171, icon: "🏠" },
    { type: "substations", lat: 37.4285, lng: -122.169, icon: "🗼" },
    { type: "feeder", lat: 37.427, lng: -122.168, icon: "⚡" },
    { type: "households", lat: 37.429, lng: -122.17, icon: "🏠" },
    { type: "substations", lat: 37.4265, lng: -122.1695, icon: "🗼" },
  ];

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
          <div className="relative">
            <div 
              className="w-10 h-10 rounded-full bg-orange-300 flex items-center justify-center cursor-pointer"
              onClick={() => setShowPopover(!showPopover)}
            >
              <span role="img" aria-label="avatar">
                👤
              </span>
            </div>
            {showPopover && (
              <div  style={{borderRadius: "10px !important"}} className="absolute right-0 mt-2 w-48 bg-white shadow-lg py-2 z-50">
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setShowPopover(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
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
                  <Image
                    src="/progress.svg"
                    width={100}
                    height={100}
                    alt="DER Utilization Progress"
                  />
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
                  <Image
                    src="/progress-1.svg"
                    width={100}
                    height={100}
                    alt="System Load Progress"
                  />
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
                    <Image
                      src="/progress-2.svg"
                      width={160}
                      height={160}
                      alt="Mitigation Events Progress"
                    />
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
            className="w-full bg-[#7B8187] bg-opacity-80 rounded-[4px] p-4 mt-2"
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
                    className={`flex items-center gap-2 px-5 py-2 rounded-[100px] font-semibold text-base transition border border-gray-300 focus:outline-none ${
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
            <div className="w-full h-[88%] bg-[#454B52] rounded-[4px] relative">
              {/* Google Map integration */}
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "0.75rem",
                  }}
                  center={{ lat: 37.4275, lng: -122.1697 }}
                  zoom={16}
                  options={{
                    disableDefaultUI: true,
                    styles: [
                      {
                        elementType: "geometry",
                        stylers: [{ color: "#454B52" }],
                      },
                      {
                        elementType: "labels.text.fill",
                        stylers: [{ color: "#ffffff" }],
                      },
                      {
                        elementType: "labels.text.stroke",
                        stylers: [{ color: "#222222" }],
                      },
                    ],
                  }}
                >
                  {markers
                    .filter(
                      (marker) =>
                        activeMapTab === "all" || marker.type === activeMapTab
                    )
                    .map((marker, idx) => (
                      <Marker
                        key={idx}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        label={{
                          text: marker.icon,
                          fontSize: "28px",
                        }}
                        // Optionally, you can use custom icons here
                      />
                    ))}
                </GoogleMap>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  Loading Map...
                </div>
              )}
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
