import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Bell, Settings, LogOut, User } from "lucide-react";
import Button from "../ui/Button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileDropdown = () =>
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    closeMenu();
    setIsProfileDropdownOpen(false);
  };

  const navLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Assessment", path: "/assessment" },
    { label: "History", path: "/history" },
    { label: "Patients", path: "/patients" },
    { label: "Users", path: "/users" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop nav */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <div
                className="text-teal-600 font-bold text-xl cursor-pointer"
                onClick={() => handleNavigation("/dashboard")}
              >
                <img className="h-10 w-56" src="/logo.png" alt="SERENIMiND" />
              </div>
            </div>

            {/* Desktop navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4 sm:items-center">
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  variant={
                    location.pathname === link.path ? "primary" : "ghost"
                  }
                  size="sm"
                  onClick={() => handleNavigation(link.path)}
                >
                  {link.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Right side nav items */}
          <div className="hidden sm:flex sm:items-center">
            <Button
              variant="ghost"
              size="sm"
              className="mr-2"
              aria-label="Notifications"
            >
              <Bell size={20} />
            </Button>

            {/* Profile dropdown */}
            <div className="relative ml-3">
              <div>
                <button
                  className="flex items-center max-w-xs rounded-full text-sm focus:outline-none"
                  onClick={toggleProfileDropdown}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white">
                    U
                  </div>
                </button>
              </div>

              {/* Profile dropdown menu */}
              {isProfileDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium">Demo User</p>
                      <p className="text-xs text-gray-500">demo@example.com</p>
                      <p className="text-xs text-teal-600 capitalize">
                        Patient
                      </p>
                    </div>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleNavigation("/profile")}
                    >
                      <div className="flex items-center">
                        <User size={16} className="mr-2" />
                        Profile
                      </div>
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleNavigation("/settings")}
                    >
                      <div className="flex items-center">
                        <Settings size={16} className="mr-2" />
                        Settings
                      </div>
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => console.log("Sign out")}
                    >
                      <div className="flex items-center">
                        <LogOut size={16} className="mr-2" />
                        Sign out
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-teal-600 hover:bg-gray-100 focus:outline-none"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                className={`${
                  location.pathname === link.path
                    ? "bg-teal-50 border-teal-500 text-teal-700"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left`}
                onClick={() => handleNavigation(link.path)}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
