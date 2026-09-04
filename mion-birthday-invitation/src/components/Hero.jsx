import { motion } from "framer-motion";

import mionFairy1 from "../assets/images/mion-fairy1.webp";
import butterfly from "../assets/images/butterfly3.png";
import fairyOne from "../assets/images/fairy1.png";
import Flower from "./Flower";

function Hero({ onEnter }) {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.6 }}
    >
      <Flower variant="one" className="garden-flower hero-garden-flower" />

      <img
        src={fairyOne}
        alt=""
        aria-hidden="true"
        className="hero-guide-fairy"
        fetchPriority="high"
        decoding="async"
      />

      <motion.img
        src={butterfly}
        alt=""
        aria-hidden="true"
        className="hero-butterfly hero-butterfly-left"
        initial={{ opacity: 0, x: -18, rotate: -22 }}
        animate={{ opacity: 0.82, x: 0, y: [0, -10, 0], rotate: [-22, -16, -22] }}
        transition={{ opacity: { duration: 1 }, x: { duration: 1 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
      />

      <motion.img
        src={butterfly}
        alt=""
        aria-hidden="true"
        className="hero-butterfly hero-butterfly-right"
        initial={{ opacity: 0, x: 18, rotate: 18 }}
        animate={{ opacity: 0.62, x: 0, y: [0, 8, 0], rotate: [18, 12, 18] }}
        transition={{ opacity: { duration: 1, delay: 0.2 }, x: { duration: 1, delay: 0.2 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
      />

      {/* Decorative sparkles */}
      <div className="sparkle sparkle-1">✦</div>
      <div className="sparkle sparkle-2">✧</div>
      <div className="sparkle sparkle-3">🌸</div>

      <motion.div
        className="hero-content"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
      >
        <p className="small-title">
          ✨ A MAGICAL CELEBRATION AWAITS ✨
        </p>

        {/* MION Hero Image */}
        <motion.div
          className="baby-circle"
          animate={{
            y: [0, -7, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="baby-image-wrapper">
            <img
              src={mionFairy1}
              alt="MION fairy birthday"
              className="baby-image"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              draggable="false"
            />
          </div>
        </motion.div>

        <p className="invite-text">
          YOU ARE INVITED TO
        </p>

        <h1>MION’S</h1>

        <h2>Fairy First Birthday</h2>

        <div className="divider" />

        <p className="description">
          Flutter into an enchanted fairy garden as our little princess
          celebrates her very first birthday.
        </p>

        <p className="birthday-date">
          MION TURNS ONE • 04 OCTOBER 2026
        </p>

        <motion.button
          type="button"
          className="enter-button"
          onClick={onEnter}
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.96,
          }}
        >
          ✨ Enter MION’s Fairy Garden ✨
        </motion.button>

        <p className="tap-text">
          Tap to begin the magical experience
        </p>
      </motion.div>
    </motion.section>
  );
}

export default Hero;
