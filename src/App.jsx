import React, { useState, useEffect, useRef } from "react";
import {
  Car,
  Wrench,
  Droplet,
  MessageSquare,
  Users,
  Menu,
  X,
  Plus,
  CheckCircle,
  AlertTriangle,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Phone,
  LogOut,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const CAR_BRANDS = ["Mercedes", "Toyota", "BMW", "Honda", "Lexus"];

const MOCK_EXPERTS = [
  {
    id: 1,
    name: "Tito Motors",
    location: "Onitsha",
    rating: 4.8,
    phone: "+234 811 1111 11",
    specialty: "Toyota Brands",
  },
  {
    id: 2,
    name: "Passer Auto Hub",
    location: "Awka",
    rating: 4.7,
    phone: "+234 800 0000 00",
    specialty: "Lexus and Honda",
  },
  {
    id: 3,
    name: "KCN Auto Services",
    location: "Nnewi",
    rating: 4.9,
    phone: "+234 8132988863",
    specialty: "Mercedes and BMW",
  },
];

const LUBRICANT_DB = {
  Mercedes: {
    oil: "Total Lubricants",
    coolant: "genuine OEM",
    trans: "ATF 134",
  },
  BMW: {
    oil: "Mobil Lubricant",
    coolant: "PEAK",
    trans: "ZF Lifeguard",
  },
  Toyota: {
    oil: "JEZCO Oil",
    coolant: "Prestone",
    trans: "WS ATF",
  },
  Honda: {
    oil: "Tonimas Oil",
    coolant: "Motorcraft",
    trans: "Honda DW-1",
  },
  Lexus: {
    oil: "0W-20 Synthetic",
    coolant: "Super Long Life Pink",
    trans: "WS ATF",
  },
  Default: {
    oil: "OIL",
    coolant: "Universal Coolant",
    trans: "Universal ATF",
  },
};

const MAINTENANCE_SCHEDULE = [
  { miles: 5000, task: "Oil & Filter Change", urgent: true },
  { miles: 10000, task: "Tire Rotation & Alignment", urgent: false },
  { miles: 15000, task: "Air Filter Replacement", urgent: false },
  { miles: 30000, task: "Brake Fluid Flush", urgent: true },
  { miles: 50000, task: "Transmission Fluid Check", urgent: true },
];

// --- COMPONENTS ---

const Navbar = ({ page, setPage, user, logout, toggleMenu, isMenuOpen }) => (
  <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setPage("landing")}
        >
          <Wrench className="h-8 w-8 text-orange-500 mr-2" />
          <span className="font-bold text-xl tracking-tight">
            Digital<span className="text-orange-500">Mechanic</span>
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => setPage("landing")}
            className="hover:text-orange-400 transition"
          >
            Home
          </button>
          {user ? (
            <>
              <button
                onClick={() => setPage("dashboard")}
                className="hover:text-orange-400 transition"
              >
                Dashboard
              </button>
              <div className="flex items-center space-x-4 ml-4">
                <span className="text-sm text-slate-400">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  <LogOut className="w-4 h-4 inline mr-1" /> Log Out
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => setPage("auth")}
              className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Sign In
            </button>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </div>

    {isMenuOpen && (
      <div className="md:hidden bg-slate-800 pb-4">
        <button
          onClick={() => {
            setPage("landing");
            toggleMenu();
          }}
          className="block w-full text-left px-4 py-2 hover:bg-slate-700"
        >
          Home
        </button>
        {user ? (
          <>
            <button
              onClick={() => {
                setPage("dashboard");
                toggleMenu();
              }}
              className="block w-full text-left px-4 py-2 hover:bg-slate-700"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                logout();
                toggleMenu();
              }}
              className="block w-full text-left px-4 py-2 text-orange-400 hover:bg-slate-700"
            >
              Log Out
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setPage("auth");
              toggleMenu();
            }}
            className="block w-full text-left px-4 py-2 text-orange-400 hover:bg-slate-700"
          >
            Sign In
          </button>
        )}
      </div>
    )}
  </nav>
);

const Footer = ({ setPage }) => (
  <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center mb-4">
            <Wrench className="h-6 w-6 text-orange-500 mr-2" />
            <span className="font-bold text-lg text-white">
              Digital<span className="text-orange-500">Mechanic</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 mb-4">
            Empowering car owners with data-driven maintenance tracking and
            expert advice. Keep your vehicle running like new.
          </p>
          <div className="flex space-x-4">
            <Facebook className="h-5 w-5 hover:text-orange-500 cursor-pointer" />
            <Twitter className="h-5 w-5 hover:text-orange-500 cursor-pointer" />
            <Instagram className="h-5 w-5 hover:text-orange-500 cursor-pointer" />
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => setPage("landing")}
                className="hover:text-orange-400"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => setPage("auth")}
                className="hover:text-orange-400"
              >
                Sign In / Register
              </button>
            </li>
            <li>
              <button className="hover:text-orange-400">Find an Expert</button>
            </li>
            <li>
              <button className="hover:text-orange-400">Lubricant Guide</button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
            Supported Brands
          </h4>
          <ul className="space-y-2 text-sm">
            <li>Mercedes-Benz</li>
            <li>Toyota</li>
            <li>BMW</li>
            <li>Honda</li>
            <li>Lexus</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
            Contact Us
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-orange-500" /> No. 3,
              Government House , Awka
            </li>
            <li className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-orange-500" /> +234 813 298
              8863{" "}
            </li>
            <li className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-orange-500" />{" "}
              nwoyechukwunonsokingsley@gmail.com
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} Digital Mechanic. All rights
          reserved.
        </p>
      </div>
    </div>
  </footer>
);

const LandingPage = ({ setPage }) => (
  <div className="min-h-screen bg-slate-50">
    <div className="relative bg-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-slate-800 opacity-50 flex items-center justify-center">
          <span className="text-slate-600 text-lg font-mono">
            <img
              src="/images/Herocar.jpg"
              alt="hero"
              className="w-full h-full object-cover opacity-30"
            />
          </span>
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          Your Personal <span className="text-orange-500">Car Expert</span>
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-slate-300">
          Track maintenance, find lubricants, and chat with AI experts for your
          Mercedes, Toyota, BMW, Honda, or Lexus.
        </p>
        <div className="mt-8">
          <button
            onClick={() => setPage("auth")}
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 md:text-lg md:px-10 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>

    {/* Features Grid */}
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-base text-orange-600 font-semibold tracking-wide uppercase">
          Features
        </h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Everything your car needs
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: Droplet,
            title: "Lubricant Guide",
            desc: "Get the exact oil and fluids for your specific model.",
          },
          {
            icon: Wrench,
            title: "Maintenance Tracker",
            desc: "Never miss a service date with smart reminders.",
          },
          {
            icon: MessageSquare,
            title: "AI Mechanic",
            desc: "Ask questions and get instant answers 24/7.",
          },
          {
            icon: Users,
            title: "Expert Access",
            desc: "Connect with verified offline mechanics near you.",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white mb-4 mx-auto">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 text-center">
              {feature.title}
            </h3>
            <p className="mt-2 text-base text-slate-500 text-center">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>

    
    <div className="max-w-7xl mx-auto py-12 px-4">
      
      <div className="bg-slate-200 rounded-2xl w-full flex items-center justify-center border-2 border-dashed border-slate-400 overflow-hidden">
        <p className="text-slate-500 text-xl font-medium">
          <img
            src="/images/Attractive.jpg"
            alt="cars"
            className="w-full h-full object-cover rounded-2xl"
            style={{ objectFit: "cover" }}
          />
        </p>
      </div>
    </div>
  </div>
);

const AuthPage = ({ login, setPage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    login(formData, isLogin);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="px-8 py-10">
          <div className="text-center mb-8">
            <Wrench className="h-12 w-12 text-orange-500 mx-auto" />
            <h2 className="mt-4 text-3xl font-extrabold text-slate-900">
              {isLogin ? "Welcome Back" : "Join Digital Mechanic"}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  required={!isLogin}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-orange-600 hover:text-orange-500 font-medium"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your AI mechanic assistant. Ask me anything about your car.",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsgs = [...messages, { sender: "user", text: input }];
    setMessages(newMsgs);
    setInput("");

    setTimeout(() => {
      let response =
        "That sounds like something you should check soon. Based on your car model, I'd recommend checking the owner's manual for specific torque specs.";
      if (input.toLowerCase().includes("oil"))
        response =
          "For your vehicle, regular oil changes are critical. I recommend checking the lubricant tab for specific viscosity.";
      if (input.toLowerCase().includes("noise"))
        response =
          "Noises can be tricky. Is it a clicking sound (CV joints) or a squealing sound (belts/brakes)?";

      setMessages((prev) => [...prev, { sender: "ai", text: response }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-lg shadow-md border border-slate-200">
      <div className="p-4 bg-slate-900 text-white rounded-t-lg flex items-center">
        <MessageSquare className="w-5 h-5 mr-2 text-orange-500" />
        <h3 className="font-semibold">AI Assistant</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.sender === "user"
                  ? "bg-orange-600 text-white"
                  : "bg-white border border-slate-200 text-slate-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="p-4 bg-white border-t border-slate-200 flex">
        <input
          type="text"
          className="flex-1 border border-slate-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
          placeholder="Ask about your car..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-orange-600 text-white px-4 py-2 rounded-r-md hover:bg-orange-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

const CarManager = ({ myCars, addCar, activeCarId, setActiveCarId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCar, setNewCar] = useState({ make: "Toyota", model: "", year: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    addCar(newCar);
    setIsAdding(false);
    setNewCar({ make: "Toyota", model: "", year: "" });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800">My Garage</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Car
        </button>
      </div>

      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-slate-50 p-4 rounded-md border border-slate-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              className="p-2 border rounded-md"
              value={newCar.make}
              onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
            >
              {CAR_BRANDS.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Model (e.g. Camry)"
              required
              className="p-2 border rounded-md"
              value={newCar.model}
              onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
            />
            <input
              type="number"
              placeholder="Year"
              required
              className="p-2 border rounded-md"
              value={newCar.year}
              onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="mt-3 w-full bg-slate-900 text-white py-2 rounded-md hover:bg-slate-800"
          >
            Save Vehicle
          </button>
        </form>
      )}

      {myCars.length === 0 ? (
        <p className="text-slate-500 italic">
          No cars added yet. Add one to get started.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myCars.map((car) => (
            <div
              key={car._id} // Use MongoDB '_id'
              // Ensure ID is a string before setting
              onClick={() => setActiveCarId(String(car._id))}
              className={`cursor-pointer border-2 rounded-xl p-4 transition relative overflow-hidden ${
                activeCarId === car._id
                  ? "border-orange-500 bg-orange-50"
                  : "border-slate-200 hover:border-orange-300"
              }`}
            >
              {/* PLACEHOLDER: Car Thumbnail */}
              <div className="w-full h-24 bg-slate-200 rounded-md mb-3 flex items-center justify-center">
                <Car className="text-slate-400 w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900">
                {car.year} {car.make}
              </h3>
              <p className="text-slate-600">{car.model}</p>
              {activeCarId === car._id && (
                <div className="absolute top-2 right-2 text-orange-500">
                  <CheckCircle className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Dashboard = ({ user }) => {
  const [myCars, setMyCars] = useState([]);
  const [activeCarId, setActiveCarId] = useState(null);
  const [activeTab, setActiveTab] = useState("lubricants");
  const [errorMessage, setErrorMessage] = useState("");


 
  const addCar = async (carData) => {
    setErrorMessage("");
    if (!user || !user.id) {
      setErrorMessage(
        "Error: User session expired or missing ID. Please log in again."
      );
      return;
    }

    try {
      // The backend expects userId and car details
      const response = await fetch(`${API_BASE_URL}/cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...carData, userId: user.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to add car to the database."
        );
      }
      const newCar = await response.json();
      setMyCars([...myCars, newCar]); // Ensure ID is a string
      setActiveCarId(String(newCar._id));
    } catch (error) {
      console.error("Error adding car", error);
      setErrorMessage(`Error: ${error.message}`);
    }
  };

  const activeCar = myCars.find((c) => c._id === activeCarId);
  const carData = activeCar
    ? LUBRICANT_DB[activeCar.make] || LUBRICANT_DB["Default"]
    : null;

  return (
    <div className="min-h-screen bg-slate-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Dashboard</h1>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            {errorMessage}
          </div>
        )}

        <CarManager
          myCars={myCars}
          addCar={addCar}
          activeCarId={activeCarId}
          setActiveCarId={setActiveCarId}
        />

        {activeCar ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-2 flex space-x-2 overflow-x-auto">
                {["lubricants", "maintenance", "experts"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 px-4 rounded-md capitalize font-medium ${
                      activeTab === tab
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 min-h-[400px]">
                {activeTab === "lubricants" && carData && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Droplet className="w-6 h-6 text-orange-500 mr-2" />
                      Recommended Fluids for {activeCar.make}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center">
                        <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">
                          Engine Oil
                        </p>
                        <p className="text-lg font-bold text-slate-900 mt-2">
                          {carData.oil}
                        </p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center">
                        <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">
                          Coolant
                        </p>
                        <p className="text-lg font-bold text-slate-900 mt-2">
                          {carData.coolant}
                        </p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center">
                        <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">
                          Transmission
                        </p>
                        <p className="text-lg font-bold text-slate-900 mt-2">
                          {carData.trans}
                        </p>
                      </div>
                    </div>

                   <div className="mt-8 w-full rounded-lg border-2 border-slate-300 overflow-hidden">
  <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] md:aspect-[1/1]">
    <img
      src="/images/Mercedes.jpg"
      alt="Mercedes Car"
      className="absolute inset-0 w-full h-full object-cover"
    />
  </div>
</div>
                  </div>
                )}

                {activeTab === "maintenance" && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Wrench className="w-6 h-6 text-orange-500 mr-2" />
                      Maintenance Schedule
                    </h3>
                    <div className="space-y-3">
                      {MAINTENANCE_SCHEDULE.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg border-b border-slate-100"
                        >
                          <div className="flex items-center">
                            {item.urgent ? (
                              <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />
                            ) : (
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                            )}
                            <div>
                              <p className="font-semibold text-slate-800">
                                {item.task}
                              </p>
                              <p className="text-sm text-slate-500">
                                Every {item.miles.toLocaleString()} miles
                              </p>
                            </div>
                          </div>
                          <button className="text-sm text-blue-600 font-medium hover:underline">
                            Log Done
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "experts" && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Users className="w-6 h-6 text-orange-500 mr-2" />
                      Verified Experts Nearby
                    </h3>
                    <div className="space-y-4">
                      {MOCK_EXPERTS.map((expert) => (
                        <div
                          key={expert.id}
                          className="border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                        >
                          <div>
                            <h4 className="font-bold text-lg">{expert.name}</h4>
                            <p className="text-sm text-slate-600">
                              {expert.location} •{" "}
                              <span className="text-orange-600">
                                {expert.specialty}
                              </span>
                            </p>
                            <div className="flex items-center mt-1">
                              <span className="text-yellow-500 text-sm">
                                ★ {expert.rating}
                              </span>
                            </div>
                          </div>
                          <button className="mt-3 sm:mt-0 bg-slate-900 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800">
                            Call {expert.phone}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <AIChat />
              <div className="mt-6 bg-orange-100 border border-orange-200 p-4 rounded-lg">
                <h4 className="text-orange-800 font-bold mb-2">
                  Did you know?
                </h4>
                <p className="text-sm text-orange-700">
                  Rotating your tires every 5,000 miles can extend their life by
                  up to 20%.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <Car className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-900">
              Select or Add a Car
            </h3>
            <p className="text-slate-500">
              Choose a vehicle from your garage to see maintenance details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Container
const App = () => {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authError, setAuthError] = useState("");

  const login = async (userData, isLoginAttempt) => {
    
    setAuthError("");
    try {
      
      const dataToSend = isLoginAttempt
        ? { email: userData.email, password: userData.password }
        : userData; 

    
      const maxRetries = 3;
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          const data = await response.json();
          
          setUser({ ...data.user, id: String(data.user._id) });
          setPage("dashboard");
          return; 
        }

        if (attempt < maxRetries - 1) {
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          const errorData = await response.json();
          
          throw new Error(
            errorData.message || "Authentication failed after multiple retries."
          );
        }
      }
    } catch (error) {
      console.error("Authentication failed", error);
      setAuthError(`Authentication failed: ${error.message}`);
    }
  };

  const logout = () => {
    setUser(null);
    setPage("landing");
  };


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="font-sans text-slate-900 flex flex-col min-h-screen">
      <Navbar
        page={page}
        setPage={setPage}
        user={user}
        logout={logout}
        toggleMenu={toggleMenu} 
        isMenuOpen={isMenuOpen}
      />

      <div className="flex-grow">
        {authError && page === "auth" && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mx-auto max-w-md mt-4">
            {authError}
          </div>
        )}
        {page === "landing" && <LandingPage setPage={setPage} />}
        {page === "auth" && <AuthPage login={login} setPage={setPage} />}
        {page === "dashboard" && user && <Dashboard user={user} />}
       
        {page === "dashboard" &&
          !user &&
          useEffect(() => setPage("auth"), []) &&
          null}
      </div>

      <Footer setPage={setPage} />
    </div>
  );
};

export default App;
