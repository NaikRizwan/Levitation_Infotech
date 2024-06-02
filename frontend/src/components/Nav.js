import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { FiLogIn } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import "tailwindcss/tailwind.css";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const { state, dispatch } = useUser();

  const callAbout = async () => {
    try {
      const response = await fetch(
        "https://levitation-infotech.vercel.app/about",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.status === 400 || !data) {
        dispatch({ type: "CLEAR_USER" });
      } else {
        dispatch({
          type: "SET_USER",
          payload: {
            name: data.full_name,
            email: data.email,
            role: data.role,
            img: data.profileImage,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "CLEAR_USER" });
    }
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    setIsScrolled(scrollTop > 0);
  };

  useEffect(() => {
    callAbout();
  }, [state.loggedIn]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-current shadow-lg" : "bg-[#2c3e50] "
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-2 px-4">
        <div className="text-lg font-bold text-white font-mono bg-gradient-to-r from-white via-orange-500 to-green-500 bg-clip-text text-transparent shadow-md transition-transform duration-300 transform hover:scale-110">
          Levitation Infotech
        </div>
        <div
          className="md:hidden flex flex-col items-center cursor-pointer"
          onClick={toggleNav}
        >
          <div className="w-6 h-1 bg-white mb-1"></div>
          <div className="w-6 h-1 bg-white mb-1"></div>
          <div className="w-6 h-1 bg-white"></div>
        </div>
        <div
          className={`md:flex md:items-center ${
            isNavOpen ? "flex flex-col w-full mt-2" : "hidden"
          }`}
        >
          <NavLink
            exact
            to="/"
            activeClassName="text-[#ffcc00] font-bold"
            className="text-white px-2 py-1"
          >
            Home
          </NavLink>

          <NavLink
            to="/"
            activeClassName="text-[#ffcc00] font-bold"
            className="text-white px-2 py-1"
          >
            About
          </NavLink>
          <NavLink
            to="/"
            activeClassName="text-[#ffcc00] font-bold"
            className="text-white px-2 py-1"
          >
            Contact
          </NavLink>
          {state.loggedIn && state.role === "admin" && (
            <NavLink
              to="/admin"
              activeClassName="text-[#ffcc00] font-bold"
              className="text-white px-2 py-1"
            >
              Admin
            </NavLink>
          )}
          {state.loggedIn ? (
            <div className="relative">
              <button
                className="flex items-center bg-transparent border-none cursor-pointer"
                onClick={toggleDropdown}
              >
                <img
                  src={state.img}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border-2 border-[#ffcc00]"
                />
              </button>
              <div
                className={`absolute right-0 mt-2 bg-[#343a40] rounded-md shadow-lg ${
                  isDropdownOpen ? "block" : "hidden"
                }`}
              >
                <NavLink
                  to="/profile"
                  onClick={closeDropdown}
                  className="block px-4 py-2 text-white hover:bg-blue-500"
                >
                  <CgProfile /> My Profile
                </NavLink>

                <NavLink
                  to="/logout"
                  onClick={closeDropdown}
                  className="block px-4 py-2 text-white hover:bg-blue-500"
                >
                  <FiLogIn /> Logout
                </NavLink>
              </div>
            </div>
          ) : (
            <NavLink
              to="/login"
              activeClassName="text-[#ffcc00] font-bold"
              className="text-white px-2 py-1"
            >
              {/* <FiLogIn /> */}
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
