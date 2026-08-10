import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiMessageCircle, FiPlus, FiPhoneCall, FiMapPin, FiX } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";
import { useLocation } from "react-router-dom";
import "./ContactFloat.css";

const ContactFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (showInfoModal) setShowInfoModal(false);
  };

  const isBottomPage = ["/", "/hotel", "/flight", "/tour"].includes(
    location.pathname,
  );

  const contactOptions = [
    {
      id: "whatsapp-in",
      icon: <IoLogoWhatsapp />,
      label: "WhatsApp: +91 96467 47171 (India)",
      href: "https://wa.me/919646747171?text=Hello%20YOUR%20FRIEND%20Team%2C%20I%20would%20like%20to%20inquire%20about%20flights%20and%20travel%20services.",
      external: true,
      className: "whatsapp",
    },
    {
      id: "whatsapp-ca",
      icon: <IoLogoWhatsapp />,
      label: "WhatsApp: +1 778-240-4599 (Canada)",
      href: "https://wa.me/17782404599?text=Hello%20YOUR%20FRIEND%20Team%2C%20I%20would%20like%20to%20inquire%20about%20flights%20and%20travel%20services.",
      external: true,
      className: "whatsapp-ca",
    },
    {
      id: "call-in",
      icon: <FiPhoneCall />,
      label: "Call: +91 96467 47171",
      href: "tel:+919646747171",
      external: false,
      className: "phone",
    },
    {
      id: "info",
      icon: <FiMapPin />,
      label: "Office & Contact Details",
      onClick: (e) => {
        e.preventDefault();
        setShowInfoModal(true);
      },
      className: "location",
    },
    {
      id: "email",
      icon: <FiMail />,
      label: "Email Us",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=info@trustedfare.com&su=Inquiry%20-%20YOUR%20FRIEND&body=Hello%20YOUR%20FRIEND%20Team,",
      external: true,
      className: "email",
    },
  ];

  return (
    <>
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
              {contactOptions.map((option, index) => {
                if (option.onClick) {
                  return (
                    <motion.button
                      key={option.id}
                      onClick={option.onClick}
                      className={`contact-option-item ${option.className}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      {option.icon}
                      <span className="contact-label">{option.label}</span>
                    </motion.button>
                  );
                }
                return (
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
                    transition={{ delay: index * 0.08 }}
                  >
                    {option.icon}
                    <span className="contact-label">{option.label}</span>
                  </motion.a>
                );
              })}
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

      {/* Office Details Modal */}
      <AnimatePresence>
        {showInfoModal && (
          <div className="contact-info-modal-backdrop" onClick={() => setShowInfoModal(false)}>
            <motion.div
              className="contact-info-modal-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-header-custom">
                <div>
                  <h3 className="modal-brand-title">YOUR FRIEND</h3>
                  <p className="modal-subtitle">Official Contact & Office Locations</p>
                </div>
                <button
                  className="modal-close-btn"
                  onClick={() => setShowInfoModal(false)}
                  aria-label="Close"
                >
                  <FiX />
                </button>
              </div>

              <div className="modal-body-custom">
                {/* Head Office (India) */}
                <div className="office-info-block">
                  <div className="office-badge-tag head-office">🇮🇳 Head Office (India)</div>
                  <p className="office-address-text">
                    GROUND FLOOR ,Shop No 32, Bus Stand, Goniana Mandi Bathinda, Punjab, India - 151201
                  </p>
                  <div className="office-contact-actions">
                    <a href="tel:+919646747171" className="office-action-link phone-link">
                      <FiPhoneCall size={14} /> +91-9646747171
                    </a>
                    <a
                      href="https://wa.me/919646747171"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="office-action-link wa-link"
                    >
                      <IoLogoWhatsapp size={15} /> WhatsApp
                    </a>
                  </div>
                </div>

                {/* Canada Office */}
                <div className="office-info-block">
                  <div className="office-badge-tag branch-office">🇨🇦 Canada Office</div>
                  <p className="office-address-text">
                    Unit 201-7743 128 street West newton, surrey Bc V3w1L4
                  </p>
                  <div className="office-contact-actions">
                    <a href="tel:+17782404599" className="office-action-link phone-link">
                      <FiPhoneCall size={14} /> +1-778-240-4599
                    </a>
                    <a
                      href="https://wa.me/17782404599"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="office-action-link wa-link"
                    >
                      <IoLogoWhatsapp size={15} /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactFloat;
