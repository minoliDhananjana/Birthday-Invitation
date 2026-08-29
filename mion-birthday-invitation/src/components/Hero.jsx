import { motion } from "framer-motion";

import mionFairy1 from "../assets/images/mion-fairy1.webp";

function Hero({ onEnter }) {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative sparkles */}
      <div className="sparkle sparkle-1">✦</div>
      <div className="sparkle sparkle-2">✧</div>
      <div className="sparkle sparkle-3">✦</div>

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
          MION TURNS ONE • 03 OCTOBER 2026
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
