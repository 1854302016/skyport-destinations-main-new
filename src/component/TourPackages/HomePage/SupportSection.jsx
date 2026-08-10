import React from "react";
import { motion } from "framer-motion";
import "./css/SupportSection.css";

const SupportSection = () => {
  return (
    <div className="container supportSection">
      <div className="row">
        <div className="col-lg-10 col-12 mx-auto d-block">
          <motion.div
            className="hd_gems mt-60"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="contai_1100">
              <div className="infi-bx">
                <motion.div
                  className="img-ico"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <img
                    src="https://images.emtcontent.com/holiday-img/home-img/info-bnr.svg"
                    alt="holidays"
                  />
                </motion.div>
                <div className="info-ttl">
                  <motion.div
                    className="lft-p"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Hassle Free. 24X7 on-trip assistance
                  </motion.div>
                  <motion.a
                    href="tel:01143131313"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <span className="icon">
                      <img
                        src="https://images.emtcontent.com/holiday-img/home-img/phone-call.svg"
                        alt="Phone"
                      />
                    </span>
                    +592-761-8608
                  </motion.a>
                  <motion.a
                    href="mailto:holidays@tripgoonline.com"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <span className="icon">
                      <img
                        src="https://images.emtcontent.com/holiday-img/home-img/Icon-email.svg"
                        alt="Email"
                      />
                    </span>
                    info@trustedfare.com
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;
