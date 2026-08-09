import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiMessageCircle, FiPlus } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";
import { useLocation } from "react-router-dom";
import "./ContactFloat.css";

const ContactFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isBottomPage = ["/", "/hotel", "/flight", "/tour"].includes(
    location.pathname,
  );

  const contactOptions = [
    {
      id: "whatsapp",
      icon: <IoLogoWhatsapp />,
      label: "WhatsApp",
      href: "https://wa.me/5927618608",
      external: true,
      className: "whatsapp",
    },
    {
      id: "email",
      icon: <FiMail />,
      label: "Email Us",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=explore@skyportdestinations.com&su=Inquiry&body=Hello%20Skyport%20Team,",
      external: true,
      className: "email",
    },
  ];

  return (
    <div
      className={`contact-float-container ${isBottomPage ? "at-bottom" : "raised"}`}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="contact-options"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {contactOptions.map((option, index) => (
              <motion.a
                key={option.id}
                href={option.href}
                target={option.external ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={`contact-option-item ${option.className}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {option.icon}
                <span className="contact-label">{option.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="contact-button-main"
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: isOpen ? 135 : 0,
          scale: isOpen ? 1 : [1, 1.1, 1],
        }}
        transition={{
          scale: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeatDelay: 2,
          },
          rotate: {
            duration: 0.3,
          },
        }}
      >
        {isOpen ? <FiPlus /> : <FiMessageCircle />}
      </motion.button>
    </div>
  );
};

export default ContactFloat;
