import { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "./NavBar";
import emailjs from "@emailjs/browser";
import Lottie from "lottie-react";
import animationData from "../assets/tech-flow.json";
import Footer from "./Footer"; // Added Footer import

function Contact() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: "joaquinferrermolinar@gmail.com",
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(
        () => {
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setStatus("Failed to send message. Please try again.");
          console.error("EmailJS Error:", error.text, error);
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      <NavBar toggleChat={toggleChat} />
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-white pt-16 relative overflow-hidden"
      >
        <div className="absolute bottom-0 w-full h-1/2 lottie-container">
          <Lottie
            animationData={animationData}
            loop={true}
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-lg w-full mx-auto px-4 text-center relative z-10"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-blue-500 inline-block">
            Contact Me
          </h2>
          <p className="text-gray-600 mb-6">
            Have a question or want to connect? Send me a message!
          </p>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-left text-gray-700 font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-left text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-left text-gray-700 font-semibold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
                placeholder="Your message"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-3 rounded-lg text-white ${
                isSubmitting
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } transition`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            {status && (
              <p
                className={`mt-4 text-sm ${
                  status.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {status}
              </p>
            )}
          </form>
        </motion.div>
      </section>
      <Footer /> {/* Added Footer */}
    </div>
  );
}

export default Contact;