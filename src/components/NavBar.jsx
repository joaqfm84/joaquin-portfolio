import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

function NavBar({ toggleChat }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate(); // For programmatic navigation
  const isHome = location.pathname === "/";
  const isContact = location.pathname === "/contact";

  const sections = [
    { name: "Profile", id: "profile" },
    { name: "Experience", id: "experience" },
    { name: "Education", id: "education" },
    { name: "Certifications", id: "certifications" },
    { name: "Skills", id: "skills" },
    { name: "Hobbies", id: "hobbies" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (isHome) {
      // On home page, scroll to section
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // On other pages, navigate to home and scroll to section
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100); // Delay to ensure page loads
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-50 to-gray-50 backdrop-blur-md shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,0.7)] z-[1000]">
      <div
        className="h-1 bg-blue-500"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-800 hover:text-blue-500 transition"
            >
              Joaquin Ferrer
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="relative text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition"
                whileHover={{ scale: 1.05 }}
              >
                {section.name}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
            <Link
              to="/contact"
              className={`relative px-3 py-2 rounded-md text-sm font-medium transition ${
                isContact
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                Contact
                {!isContact && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </Link>
          </div>
          <div className="flex items-center">
            <motion.button
              onClick={toggleChat}
              className="relative flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,0.7)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 rounded-md border-2 border-blue-300 animate-pulse"
                style={{ opacity: 0.5 }}
              />
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.3, repeat: 0, repeatType: "loop" }}
                whileHover={{ rotate: 360 }}
              >
                <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
              </motion.div>
              Ask Away!
            </motion.button>
          </div>
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-500 p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sm:hidden bg-gradient-to-r from-blue-50 to-gray-50 shadow-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="block text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium transition w-full text-left"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {section.name}
                </motion.button>
              ))}
              <Link
                to="/contact"
                className={`block px-3 py-2 rounded-md text-base font-medium transition w-full text-left ${
                  isContact
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Contact
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default NavBar;