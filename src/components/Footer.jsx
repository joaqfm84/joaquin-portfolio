import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white py-8"> {/* Changed to bg-white */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
        <motion.a
          href="https://www.linkedin.com/in/joaquinfm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-500 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaLinkedin className="h-8 w-8" />
          <span className="sr-only">LinkedIn Profile</span>
        </motion.a>
        <p className="text-gray-600 text-sm">© 2025 Joaquin Ferrer</p> {/* Added copyright text */}
      </div>
    </footer>
  );
}

export default Footer;