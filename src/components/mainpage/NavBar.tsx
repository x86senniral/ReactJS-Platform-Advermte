import  { useState } from 'react';
import './css/Nav.css'
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-transparent-800 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <a href="#" className="flex items-center py-4 px-2">
              <span className="font-semibold text-black text-lg">Advermte</span>
            </a>
          </div>
          <div className="hidden md:flex items-center">
            <a href="#" className="mr-24 hv nav-item py-4 px-2 text-black">Home</a>
            <a href="#" className="mr-24 hv nav-item py-4 px-2 text-black">AboutUs</a>
            <a href="/adservice" className="mr-24 hv nav-item py-4 px-2 text-black">StartHere</a>
            <Link to="/signin" className="mr-24 hv nav-item py-4 px-2 text-black">Login</Link>
            <Link to="/signup" className="hv nav-item py-4 px-2 text-black">Sign Up</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="outline-none mobile-menu-button"
            >
              <svg
                className="w-6 h-6 text-gray-500 hover:text-black"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">Home</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">About</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">Services</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">Contact</a>
      </div>
    </nav>
  );
};

export default NavBar;
