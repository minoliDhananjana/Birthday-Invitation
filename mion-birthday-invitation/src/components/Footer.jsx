import { motion } from "framer-motion";
import mionFairy from "../assets/images/mion-fairy.webp";
import fairyHouse from "../assets/images/bashroom.png";
import Butterfly from "./Butterfly";

function Footer() {
  return (
    <section className="footer-section">
      <img
        src={fairyHouse}
        alt=""
        aria-hidden="true"
        className="footer-fairy-house"
        loading="lazy"
        decoding="async"
      />
      <motion.div
        className="footer-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        <motion.img
          src={mionFairy}
          alt="MION fairy"
          className="footer-baby"
          loading="lazy"
          decoding="async"
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="footer-sparkles" aria-label="Sparkling butterfly">
          <span aria-hidden="true">✨</span>
          <Butterfly className="footer-butterfly" />
          <span aria-hidden="true">✨</span>
        </div>

        <p className="footer-small">
          WITH LOVE & A LITTLE FAIRY MAGIC
        </p>

        <h2 className="footer-title">
          We can&apos;t wait to celebrate with you!
        </h2>

        <p className="footer-message">
          Your presence will make MION&apos;s very first
          birthday even more magical and memorable.
        </p>

        <div className="footer-divider"></div>

        <h3 className="footer-name">
          MION&apos;S
        </h3>

        <p className="footer-event">
          Fairy First Birthday
        </p>

        <p className="footer-date">
          CELEBRATION • 04 OCTOBER 2026
        </p>

        <div className="footer-bottom">
          🌸 ✨ 🧚‍♀️ ✨ 🌸
        </div>
      </motion.div>
    </section>
  );
}

export default Footer;
