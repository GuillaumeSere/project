import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Flag, Trophy, Calendar, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Accueil', icon: Flag },
    { path: '/races', label: 'Courses', icon: Calendar },
    { path: '/standings', label: 'Classements', icon: Trophy },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <nav className="bg-red-600 text-white fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="text-2xl font-bold flex items-center gap-2">
            <Flag className="h-6 text-black w-6" />
           <span className='text-black'>F1</span>Stats
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 hover:text-red-200 transition-colors ${
                    isActive ? 'text-red-200' : ''
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 hover:text-red-200 transition-colors ${
                    isActive ? 'text-red-200' : ''
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;